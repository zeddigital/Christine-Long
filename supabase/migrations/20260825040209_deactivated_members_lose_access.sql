-- members.status existed but nothing consulted it. Both helper functions resolved a
-- member purely by auth_user_id, so marking someone inactive relabelled the row and
-- changed nothing they could reach -- an admin turning a member off would have been
-- told it worked while the member kept every module.
--
-- Resolving to no member at all is the whole fix: current_member_id() and is_admin()
-- gate every policy in the schema, so an inactive account now holds no entitlements,
-- no admin rights and no progress, without touching their records.
--
-- The test is status <> 'inactive' rather than status = 'active': a member who has been
-- invited but has not yet set a password must still be able to get in when they do.
create or replace function private.current_member_id()
returns integer
language sql
stable
security definer
set search_path to 'public'
as $function$
  select id from public.members
  where auth_user_id = auth.uid()
    and status <> 'inactive'
  limit 1
$function$;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select coalesce(
    (select is_admin from public.members
      where auth_user_id = auth.uid()
        and status <> 'inactive'
      limit 1),
    false)
$function$;
