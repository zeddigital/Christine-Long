-- The access-check helpers are internal to the policies. Living in `public` made them
-- callable as REST endpoints (/rest/v1/rpc/is_admin). Moving them into a schema PostgREST
-- does not expose removes them from the API while policies keep working.

create schema if not exists private;
grant usage on schema private to authenticated;

create or replace function private.current_member_id()
returns integer language sql stable security definer set search_path = public as $$
  select id from public.members where auth_user_id = auth.uid() limit 1
$$;

create or replace function private.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(
    (select is_admin from public.members where auth_user_id = auth.uid() limit 1),
    false)
$$;

create or replace function private.has_module(m integer)
returns boolean language sql stable security definer set search_path = public as $$
  select private.is_admin() or exists (
    select 1 from public.entitlements e
    where e.module_id = m
      and e.member_id = private.current_member_id()
      and e.cancelled_at is null
  )
$$;

drop policy if exists members_select           on public.members;
drop policy if exists members_update_self      on public.members;
drop policy if exists modules_select           on public.modules;
drop policy if exists lessons_select           on public.lessons;
drop policy if exists lesson_sections_select   on public.lesson_sections;
drop policy if exists lesson_media_select      on public.lesson_media;
drop policy if exists media_select             on public.media;
drop policy if exists entitlements_select      on public.entitlements;
drop policy if exists progress_select          on public.lesson_progress;
drop policy if exists progress_insert          on public.lesson_progress;
drop policy if exists progress_update          on public.lesson_progress;

create policy members_select on public.members for select to authenticated
  using (auth_user_id = auth.uid() or private.is_admin());
create policy members_update_self on public.members for update to authenticated
  using (auth_user_id = auth.uid()) with check (auth_user_id = auth.uid());

create policy modules_select on public.modules for select to authenticated
  using (private.has_module(id));

create policy lessons_select on public.lessons for select to authenticated
  using (private.has_module(module_id));

create policy lesson_sections_select on public.lesson_sections for select to authenticated
  using (exists (select 1 from public.lessons l
                 where l.id = lesson_sections.lesson_id and private.has_module(l.module_id)));

create policy lesson_media_select on public.lesson_media for select to authenticated
  using (exists (select 1 from public.lessons l
                 where l.id = lesson_media.lesson_id and private.has_module(l.module_id)));

create policy media_select on public.media for select to authenticated
  using (exists (select 1 from public.lesson_media lm
                 join public.lessons l on l.id = lm.lesson_id
                 where lm.media_id = media.id and private.has_module(l.module_id)));

create policy entitlements_select on public.entitlements for select to authenticated
  using (member_id = private.current_member_id() or private.is_admin());

create policy progress_select on public.lesson_progress for select to authenticated
  using (member_id = private.current_member_id() or private.is_admin());
create policy progress_insert on public.lesson_progress for insert to authenticated
  with check (member_id = private.current_member_id());
create policy progress_update on public.lesson_progress for update to authenticated
  using (member_id = private.current_member_id())
  with check (member_id = private.current_member_id());

drop function if exists public.has_module(integer);
drop function if exists public.current_member_id();
drop function if exists public.is_admin();

revoke all on all functions in schema private from public, anon;
grant execute on all functions in schema private to authenticated;
