-- Keep internal document titles private in the guest-safe projection.
create or replace function public.eligible_knowledge(p_venue text,p_prototype boolean,p_guard text) returns table(id uuid,record_key text,venue_id uuid,question text,answer text,provenance text,source_refs jsonb,review_due date,valid_from date,valid_to date,revision integer) language plpgsql security definer set search_path='' as $$
begin
 if not exists(select 1 from private.concierge_config where guard_hash=encode(extensions.digest(p_guard,'sha256'),'hex')) then raise exception 'Invalid server guard'; end if;
 return query select k.id,k.record_key,k.venue_id,k.question,k.answer,k.provenance,
 (select jsonb_agg(jsonb_build_object('id',s->>'id','title',case when s->>'type' in ('drive_document','internal_drive_document') then 'Internal hotel reference' else s->>'title' end)) from jsonb_array_elements(k.source_refs) s),
 k.review_due,k.valid_from,k.valid_to,k.revision
 from public.knowledge_records k join public.venues v on v.id=k.venue_id
 where v.slug=p_venue and k.replaced_by is null and k.reviewed_on<=(now() at time zone 'Asia/Dubai')::date
 and k.review_due>(now() at time zone 'Asia/Dubai')::date
 and (k.valid_from is null or k.valid_from<=(now() at time zone 'Asia/Dubai')::date)
 and (k.valid_to is null or k.valid_to>=(now() at time zone 'Asia/Dubai')::date)
 and ((k.provenance='provisional' and k.status='prototype' and p_prototype) or (k.provenance in ('staff_reviewed','fictional') and k.status='published')) order by k.record_key;
end $$;
