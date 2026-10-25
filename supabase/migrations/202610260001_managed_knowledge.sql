-- M2A: private-prototype knowledge; no production approval is implied.
create table public.knowledge_records (
 id uuid primary key default gen_random_uuid(), record_key text unique not null,
 venue_id uuid not null references public.venues(id), topic_key text not null,
 kind text not null check(kind in ('faq','facility','policy')),
 question text not null check(char_length(btrim(question)) between 3 and 240),
 answer text not null check(char_length(btrim(answer)) between 3 and 2400),
 provenance text not null check(provenance in ('provisional','staff_reviewed','fictional')),
 status text not null check(status in ('draft','prototype','published','held','archived')),
 source_refs jsonb not null check(jsonb_typeof(source_refs)='array' and jsonb_array_length(source_refs)>0),
 collected_on date, reviewed_on date not null, review_due date not null,
 valid_from date, valid_to date, supersedes uuid references public.knowledge_records(id),
 replaced_by uuid references public.knowledge_records(id), revision integer not null default 1,
 updated_at timestamptz not null default now(), updated_by uuid references auth.users(id),
 check(valid_from is null or valid_to is null or valid_from<=valid_to), check(review_due>=reviewed_on),
 check((provenance='provisional' and status<>'published') or provenance<>'provisional'),
 check(supersedes is null or supersedes<>id), check(replaced_by is null or replaced_by<>id)
);
create table private.knowledge_imports(record_id uuid primary key references public.knowledge_records(id), original_record jsonb not null, pack_metadata jsonb not null);
create table private.knowledge_versions(id bigint generated always as identity primary key, record_id uuid not null, actor_id uuid, revision integer not null, changed_at timestamptz not null default now(), snapshot jsonb not null);
alter table public.knowledge_records enable row level security;
revoke all on public.knowledge_records from public, anon, authenticated;
grant select on public.knowledge_records to authenticated;
grant all on public.knowledge_records to service_role;
create policy staff_read_knowledge on public.knowledge_records for select to authenticated using(exists(select 1 from public.staff_venue_access a where a.user_id=(select auth.uid()) and a.venue_id=knowledge_records.venue_id));
-- Edits use one atomic RPC rather than untrusted direct table writes.
create function public.save_knowledge(p_record jsonb, p_expected_revision integer) returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid:=auth.uid(); target public.knowledge_records; old public.knowledge_records; result_id uuid; today date:=(now() at time zone 'Asia/Dubai')::date;
begin
 if actor is null then raise exception 'Not authorised'; end if;
 if p_expected_revision is null then raise exception 'Revision required'; end if;
 if p_record->>'id' is not null then
  select * into old from public.knowledge_records where id=(p_record->>'id')::uuid for update;
  if old.id is null or old.revision<>p_expected_revision then raise exception 'Record changed; reload before saving'; end if;
  target:=old;
 else
  if p_expected_revision<>0 then raise exception 'Invalid new revision'; end if;
  target.id:=gen_random_uuid(); target.record_key:='STAFF-'||target.id::text; target.venue_id:=(p_record->>'venue_id')::uuid;
  target.topic_key:=coalesce(nullif(p_record->>'topic_key',''),target.record_key); target.revision:=0;
 end if;
 if not exists(select 1 from public.staff_venue_access where user_id=actor and venue_id=target.venue_id) then raise exception 'Not authorised for venue'; end if;
 target.kind:=p_record->>'kind'; target.question:=btrim(p_record->>'question'); target.answer:=btrim(p_record->>'answer');
 target.provenance:=p_record->>'provenance'; target.status:=p_record->>'status'; target.source_refs:=p_record->'source_refs';
 target.reviewed_on:=(p_record->>'reviewed_on')::date; target.review_due:=(p_record->>'review_due')::date;
 target.valid_from:=nullif(p_record->>'valid_from','')::date; target.valid_to:=nullif(p_record->>'valid_to','')::date;
 if target.provenance not in ('staff_reviewed','fictional') and old.id is null then raise exception 'Staff records must be reviewed or fictional'; end if;
 -- A provisional source is replaced by a new reviewed record; never rewrite its provenance.
 if old.provenance='provisional' and target.provenance<>old.provenance then raise exception 'Create a reviewed replacement for provisional content'; end if;
 if old.id is null then target.supersedes:=nullif(p_record->>'supersedes','')::uuid; end if;
 if target.supersedes is not null then
  select * into old from public.knowledge_records where id=target.supersedes for update;
  if old.id is null or old.venue_id<>target.venue_id or old.topic_key<>target.topic_key then raise exception 'Replacement must have the same venue and topic'; end if;
 end if;
 target.revision:=target.revision+1; target.updated_at:=clock_timestamp(); target.updated_by:=actor;
 insert into public.knowledge_records select (target).*
 on conflict(id) do update set kind=excluded.kind,question=excluded.question,answer=excluded.answer,provenance=excluded.provenance,status=excluded.status,source_refs=excluded.source_refs,reviewed_on=excluded.reviewed_on,review_due=excluded.review_due,valid_from=excluded.valid_from,valid_to=excluded.valid_to,revision=excluded.revision,updated_at=excluded.updated_at,updated_by=excluded.updated_by;
 if target.supersedes is not null and target.provenance='staff_reviewed' and target.status='published' then
  if target.review_due<=today or target.reviewed_on>today or target.valid_from>today or target.valid_to<today then raise exception 'Replacement must be current before publication'; end if;
  if old.replaced_by is not null and old.replaced_by<>target.id then raise exception 'Predecessor already replaced'; end if;
  -- Tombstone remains even if the replacement later expires: stale originals cannot revive.
  update public.knowledge_records set replaced_by=target.id,revision=revision+1,updated_at=clock_timestamp(),updated_by=actor where id=target.supersedes and replaced_by is null;
 end if;
 return target.id;
end $$;
revoke all on function public.save_knowledge(jsonb,integer) from public,anon;
grant execute on function public.save_knowledge(jsonb,integer) to authenticated;
create function private.audit_knowledge() returns trigger language plpgsql security definer set search_path='' as $$ begin
 insert into private.knowledge_versions(record_id,actor_id,revision,snapshot) values(new.id,auth.uid(),new.revision,to_jsonb(new)); return new; end $$;
create trigger audit_knowledge after insert or update on public.knowledge_records for each row execute function private.audit_knowledge();
revoke all on function private.audit_knowledge() from public,anon,authenticated;
create function public.knowledge_history(p_id uuid) returns table(revision integer,changed_at timestamptz,snapshot jsonb) language sql security definer set search_path='' as $$
 select h.revision,h.changed_at,h.snapshot from private.knowledge_versions h join public.knowledge_records k on k.id=h.record_id
 where h.record_id=p_id and exists(select 1 from public.staff_venue_access a where a.user_id=auth.uid() and a.venue_id=k.venue_id) order by h.id desc limit 30;
$$;
revoke all on function public.knowledge_history(uuid) from public,anon;
grant execute on function public.knowledge_history(uuid) to authenticated;

create table private.concierge_config(id boolean primary key default true check(id),guard_hash text not null,enabled boolean not null default false,budget_cents integer not null default 500 check(budget_cents between 0 and 500),reserved_cents integer not null default 0);
create table private.concierge_attempts(id uuid primary key default gen_random_uuid(),session_hash text not null,created_at timestamptz not null default now(),finished boolean not null default false,outcome text not null default 'reserved');
create function public.eligible_knowledge(p_venue text,p_prototype boolean,p_guard text) returns table(id uuid,record_key text,venue_id uuid,question text,answer text,provenance text,source_refs jsonb,review_due date,valid_from date,valid_to date,revision integer) language plpgsql security definer set search_path='' as $$
begin
 if not exists(select 1 from private.concierge_config where guard_hash=encode(extensions.digest(p_guard,'sha256'),'hex')) then raise exception 'Invalid server guard'; end if;
 return query select k.id,k.record_key,k.venue_id,k.question,k.answer,k.provenance,
 (select jsonb_agg(jsonb_build_object('id',s->>'id','title',case when s->>'type'='drive_document' then 'Internal hotel reference' else s->>'title' end)) from jsonb_array_elements(k.source_refs) s),
 k.review_due,k.valid_from,k.valid_to,k.revision
 from public.knowledge_records k join public.venues v on v.id=k.venue_id
 where v.slug=p_venue and k.replaced_by is null and k.reviewed_on<=(now() at time zone 'Asia/Dubai')::date
 and k.review_due>(now() at time zone 'Asia/Dubai')::date
 and (k.valid_from is null or k.valid_from<=(now() at time zone 'Asia/Dubai')::date)
 and (k.valid_to is null or k.valid_to>=(now() at time zone 'Asia/Dubai')::date)
 and ((k.provenance='provisional' and k.status='prototype' and p_prototype) or (k.provenance in ('staff_reviewed','fictional') and k.status='published')) order by k.record_key;
end $$;
revoke all on function public.eligible_knowledge(text,boolean,text) from public;
grant execute on function public.eligible_knowledge(text,boolean,text) to anon,authenticated;
create function public.reserve_concierge(p_session text,p_guard text) returns uuid language plpgsql security definer set search_path='' as $$
declare c private.concierge_config; attempt uuid;
begin
 select * into c from private.concierge_config where id=true for update;
 if c.guard_hash<>encode(extensions.digest(p_guard,'sha256'),'hex') or not c.enabled then raise exception 'AI usage disabled'; end if;
 if c.reserved_cents+12>c.budget_cents then raise exception 'Trial budget exhausted'; end if;
 if (select count(*) from private.concierge_attempts where session_hash=p_session and created_at>now()-interval '1 hour')>=8 then raise exception 'Session limit reached'; end if;
 if (select count(*) from private.concierge_attempts where not finished and created_at>now()-interval '30 seconds')>=2 then raise exception 'Concierge busy'; end if;
 if (select count(*) from private.concierge_attempts where created_at>now()-interval '1 day')>=60 then raise exception 'Daily limit reached'; end if;
 update private.concierge_config set reserved_cents=reserved_cents+12 where id=true;
 insert into private.concierge_attempts(session_hash) values(p_session) returning id into attempt; return attempt;
end $$;
revoke all on function public.reserve_concierge(text,text) from public;
grant execute on function public.reserve_concierge(text,text) to anon;
create function public.finish_concierge(p_id uuid,p_outcome text,p_guard text) returns void language plpgsql security definer set search_path='' as $$ begin
 if not exists(select 1 from private.concierge_config where guard_hash=encode(extensions.digest(p_guard,'sha256'),'hex')) then raise exception 'Invalid server guard'; end if;
 update private.concierge_attempts set finished=true,outcome=case when p_outcome='success' then 'success' else 'failed' end where id=p_id;
end $$;
revoke all on function public.finish_concierge(uuid,text,text) from public;
grant execute on function public.finish_concierge(uuid,text,text) to anon;
