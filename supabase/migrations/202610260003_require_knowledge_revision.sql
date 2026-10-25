create or replace function public.save_knowledge(p_record jsonb, p_expected_revision integer) returns uuid language plpgsql security definer set search_path='' as $$
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
