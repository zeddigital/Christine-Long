-- Admins could read everything but not change anything. Christine needs to add members,
-- grant and revoke modules, and correct details. Ordinary members remain unable to write
-- to any of these tables — only their own progress.

create policy members_admin_insert on public.members for insert to authenticated
  with check (private.is_admin());
create policy members_admin_update on public.members for update to authenticated
  using (private.is_admin()) with check (private.is_admin());
create policy members_admin_delete on public.members for delete to authenticated
  using (private.is_admin());

create policy entitlements_admin_insert on public.entitlements for insert to authenticated
  with check (private.is_admin());
create policy entitlements_admin_update on public.entitlements for update to authenticated
  using (private.is_admin()) with check (private.is_admin());
create policy entitlements_admin_delete on public.entitlements for delete to authenticated
  using (private.is_admin());

-- Admins need the whole catalogue visible, not just what they personally hold,
-- so they can grant modules they have not been given themselves.
drop policy if exists modules_select on public.modules;
create policy modules_select on public.modules for select to authenticated
  using (private.is_admin() or private.has_module(id));

-- A per-member progress summary for the admin view. Security invoker so the caller's
-- own policies still apply: a member querying this sees only themselves.
create or replace view public.member_overview
with (security_invoker = true) as
select m.id,
       m.email,
       m.first_name,
       m.last_name,
       m.status,
       m.is_admin,
       m.last_seen_at,
       m.created_at,
       count(distinct e.module_id) filter (where e.cancelled_at is null) as modules_held,
       count(distinct lp.lesson_id) filter (where lp.completed_at is not null) as lessons_completed,
       max(lp.first_viewed_at) as last_activity
from public.members m
left join public.entitlements e on e.member_id = m.id
left join public.lesson_progress lp on lp.member_id = m.id
group by m.id;

grant select on public.member_overview to authenticated;
