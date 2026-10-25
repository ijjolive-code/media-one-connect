-- Reject null guard/revision values; SQL NULL must never become an allow decision.
create or replace function public.reserve_concierge(p_session text,p_guard text) returns uuid language plpgsql security definer set search_path='' as $$
declare c private.concierge_config; attempt uuid;
begin
 select * into c from private.concierge_config where id=true for update;
 if c.id is null or c.guard_hash is distinct from encode(extensions.digest(p_guard,'sha256'),'hex') or not c.enabled then raise exception 'AI usage disabled'; end if;
 if p_session is null or p_session !~ '^[a-f0-9]{64}$' then raise exception 'Invalid session'; end if;
 if c.reserved_cents+12>c.budget_cents then raise exception 'Trial budget exhausted'; end if;
 if (select count(*) from private.concierge_attempts where session_hash=p_session and created_at>now()-interval '1 hour')>=8 then raise exception 'Session limit reached'; end if;
 if (select count(*) from private.concierge_attempts where not finished and created_at>now()-interval '30 seconds')>=2 then raise exception 'Concierge busy'; end if;
 if (select count(*) from private.concierge_attempts where created_at>now()-interval '1 day')>=60 then raise exception 'Daily limit reached'; end if;
 update private.concierge_config set reserved_cents=reserved_cents+12 where id=true;
 insert into private.concierge_attempts(session_hash) values(p_session) returning id into attempt; return attempt;
end $$;
create function private.check_knowledge_update() returns trigger language plpgsql set search_path='' as $$ begin
 if new.provenance='provisional' and exists(select 1 from private.knowledge_imports i where i.record_id=new.id and new.review_due>new.reviewed_on+((i.original_record->>'review_after')::date-(i.pack_metadata->>'collected_on')::date)) then raise exception 'Imported review window cannot be extended beyond its source review interval'; end if;
 return new;
end $$;
create trigger check_knowledge_update before update on public.knowledge_records for each row execute function private.check_knowledge_update();
revoke all on function private.check_knowledge_update() from public,anon,authenticated;
