-- Idempotent initial fixtures. Never overwrite edited content on subsequent setup.
insert into public.venues (id, slug, name) values
 ('11111111-1111-4111-8111-111111111111','media-one-hotel','Media One Hotel'),
 ('22222222-2222-4222-8222-222222222222','fictional-other-venue','Fictional test venue')
on conflict do nothing;
insert into public.offers (id, venue_id, title, description, terms, starts_on, ends_on, is_published) values
 ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','11111111-1111-4111-8111-111111111111',
  'A fictional afternoon pause','A sample afternoon experience for the Media One Hotel demonstration. No real benefit or booking is offered.',
  'Fictional test offer only. No cash value, redemption or reservation. Details may be edited by authorised test staff.',
  current_date - 1, current_date + 90, true),
 ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','22222222-2222-4222-8222-222222222222',
  'Other venue private draft','Private fictional record used to verify venue boundaries.',
  'Test only. Must not be editable by Media One Hotel staff.', current_date - 1, current_date + 90, false)
on conflict do nothing;
