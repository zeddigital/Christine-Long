-- SECURITY FIX: members_update_self let a member update their own row, and Postgres row
-- policies cannot restrict WHICH columns. A member could therefore PATCH is_admin=true on
-- themselves and become an administrator — gaining the whole member list, the full module
-- catalogue and the invite function. Caught by testing as an ordinary member.
--
-- A row-level trigger is the right guard: it can compare the new row against the old one,
-- which a WITH CHECK expression cannot.

create or replace function private.guard_member_columns()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if private.is_admin() then
    return new;                      -- Christine may change anything
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
end $$;

drop trigger if exists members_guard_columns on public.members;
create trigger members_guard_columns
  before update on public.members
  for each row execute function private.guard_member_columns();

revoke all on all functions in schema private from public, anon;
grant execute on all functions in schema private to authenticated;
