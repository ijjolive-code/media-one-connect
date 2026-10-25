-- Fictional development content only. Runtime clients never receive service_role.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table public.venues (
  id uuid primary key,
  slug text unique not null,
  name text not null
);
create table public.staff_venue_access (
  user_id uuid not null references auth.users(id) on delete cascade,
  venue_id uuid not null references public.venues(id),
  primary key (user_id, venue_id)
);
create table public.offers (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues(id),
  title text not null check (char_length(btrim(title)) between 3 and 100),
  description text not null check (char_length(btrim(description)) between 10 and 1000),
  terms text not null check (char_length(btrim(terms)) between 5 and 2000),
  starts_on date not null,
  ends_on date not null,
  is_published boolean not null default false,
  is_demo boolean not null default true check (is_demo),
  revision integer not null default 1,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id),
  check (starts_on <= ends_on)
);
create table private.offer_revisions (
  id bigint generated always as identity primary key,
  offer_id uuid not null,
  actor_id uuid,
  revision integer not null,
  changed_at timestamptz not null default now(),
  previous_record jsonb not null,
  saved_record jsonb not null
);

alter table public.venues enable row level security;
alter table public.staff_venue_access enable row level security;
alter table public.offers enable row level security;
revoke all on public.venues, public.staff_venue_access, public.offers from anon, authenticated;
grant select on public.venues, public.offers to anon, authenticated;
grant select on public.staff_venue_access to authenticated;
-- Column grants additionally prevent venue/id/author/revision/demo-flag spoofing.
grant update (title, description, terms, starts_on, ends_on, is_published) on public.offers to authenticated;
create policy venue_names on public.venues for select to anon, authenticated using (true);
create policy staff_can_read_own_access on public.staff_venue_access for select to authenticated
  using (user_id = (select auth.uid()));
create policy visible_demo_offers on public.offers for select to anon, authenticated
  using (is_published and is_demo
    and starts_on <= (now() at time zone 'Asia/Dubai')::date
    and ends_on >= (now() at time zone 'Asia/Dubai')::date);
create policy staff_can_read_venue_offers on public.offers for select to authenticated
  using (exists (select 1 from public.staff_venue_access a
    where a.user_id = (select auth.uid()) and a.venue_id = offers.venue_id));
create policy staff_can_update_venue_offers on public.offers for update to authenticated
  using (exists (select 1 from public.staff_venue_access a
    where a.user_id = (select auth.uid()) and a.venue_id = offers.venue_id))
  with check (is_demo and exists (select 1 from public.staff_venue_access a
    where a.user_id = (select auth.uid()) and a.venue_id = offers.venue_id));

create function public.stamp_offer_revision() returns trigger language plpgsql
  set search_path = '' as $$
begin
  new.revision := old.revision + 1;
  new.updated_at := clock_timestamp();
  new.updated_by := auth.uid();
  return new;
end;
$$;
revoke all on function public.stamp_offer_revision() from public, anon, authenticated;
create trigger stamp_offer_revision before update on public.offers
  for each row execute function public.stamp_offer_revision();
create function private.audit_offer_revision() returns trigger language plpgsql security definer
  set search_path = '' as $$
begin
  insert into private.offer_revisions(offer_id, actor_id, revision, previous_record, saved_record)
    values (new.id, auth.uid(), new.revision, to_jsonb(old), to_jsonb(new));
  return new;
end;
$$;
revoke all on function private.audit_offer_revision() from public, anon, authenticated;
create trigger audit_offer_revision after update on public.offers
  for each row execute function private.audit_offer_revision();
