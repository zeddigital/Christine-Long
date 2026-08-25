-- The guard stops a member escalating their own privileges. It gated only on
-- private.is_admin(), which resolves through auth.uid() -- NULL for the service role.
-- So invite-member's service-role UPDATE had its auth_user_id link silently reverted,
-- and re-inviting any of the 29 imported WordPress members produced a login that was
-- never connected to its member row.
--
-- auth.role() reads the JWT role claim, so it is unaffected by SECURITY DEFINER
-- (current_user would be the owner, 'postgres', and would disable the guard outright).
-- A browser session is always 'authenticated' or 'anon'; only the Edge Function holds
-- the service role key, and it already re-checks admin status server-side before
-- calling this. The member-facing protection is unchanged.
create or replace function private.guard_member_columns()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if private.is_admin() or auth.role() = 'service_role' then
    return new;                      -- Christine, or the server acting on her behalf
  end if;
  -- Everyone else may only edit their own display details. Any attempt to change a
  -- privileged column is silently reverted rather than erroring, so a well-behaved
  -- profile update still succeeds.
  new.is_admin     := old.is_admin;
  new.status       := old.status;
  new.email        := old.email;
  new.auth_user_id := old.auth_user_id;
  new.wp_user_id   := old.wp_user_id;
  new.notes        := old.notes;
  new.created_at   := old.created_at;
  return new;
end $function$;
