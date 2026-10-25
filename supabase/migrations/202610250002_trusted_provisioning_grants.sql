-- Auto-exposure is disabled. Give only the trusted provisioning role explicit
-- administration grants; runtime app credentials remain anon + user session.
grant all on public.venues, public.staff_venue_access, public.offers to service_role;
