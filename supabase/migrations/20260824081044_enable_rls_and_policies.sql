-- Access control lives in the database, not in application code. A member cannot read a
-- module they have not been granted even if the front end asks for it.

create or replace function public.current_member_id()
returns integer language sql stable security definer set search_path = public as $$
  select id from public.members where auth_user_id = auth.uid() limit 1
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(
    (select is_admin from public.members where auth_user_id = auth.uid() limit 1),
    false)
$$;

-- True when the signed-in member holds a live grant for this module.
create or replace function public.has_module(m integer)
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin() or exists (
    select 1 from public.entitlements e
    where e.module_id = m
      and e.member_id = public.current_member_id()
      and e.cancelled_at is null
  )
$$;

alter table public.members         enable row level security;
alter table public.modules         enable row level security;
alter table public.lessons         enable row level security;
alter table public.lesson_sections enable row level security;
alter table public.media           enable row level security;
alter table public.lesson_media    enable row level security;
alter table public.entitlements    enable row level security;
alter table public.lesson_progress enable row level security;

-- Members see their own profile; admins see everyone.
create policy members_select on public.members for select to authenticated
  using (auth_user_id = auth.uid() or public.is_admin());
create policy members_update_self on public.members for update to authenticated
  using (auth_user_id = auth.uid()) with check (auth_user_id = auth.uid());

-- Content is visible only through a live entitlement.
create policy modules_select on public.modules for select to authenticated
  using (public.has_module(id));

create policy lessons_select on public.lessons for select to authenticated
  using (public.has_module(module_id));

create policy lesson_sections_select on public.lesson_sections for select to authenticated
  using (exists (
    select 1 from public.lessons l
    where l.id = lesson_sections.lesson_id and public.has_module(l.module_id)));

create policy lesson_media_select on public.lesson_media for select to authenticated
  using (exists (
    select 1 from public.lessons l
    where l.id = lesson_media.lesson_id and public.has_module(l.module_id)));

-- A worksheet or track is readable if any entitled lesson references it.
create policy media_select on public.media for select to authenticated
  using (exists (
    select 1 from public.lesson_media lm
    join public.lessons l on l.id = lm.lesson_id
    where lm.media_id = media.id and public.has_module(l.module_id)));

create policy entitlements_select on public.entitlements for select to authenticated
  using (member_id = public.current_member_id() or public.is_admin());

-- Members own their progress records outright.
create policy progress_select on public.lesson_progress for select to authenticated
  using (member_id = public.current_member_id() or public.is_admin());
create policy progress_insert on public.lesson_progress for insert to authenticated
  with check (member_id = public.current_member_id());
create policy progress_update on public.lesson_progress for update to authenticated
  using (member_id = public.current_member_id())
  with check (member_id = public.current_member_id());
