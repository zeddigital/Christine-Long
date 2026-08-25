-- Admins could read the programme but never change it: modules, lessons, sections and
-- media each carried a SELECT policy and nothing else. Module management needs writes,
-- and it needs a way to take a module out of circulation that is not a delete -- every
-- foreign key here cascades, so deleting one module destroys its lessons, their sections
-- and every member's entitlement to it.
alter table public.modules add column if not exists archived_at timestamptz;

comment on column public.modules.archived_at is
  'Set to hide a module from members without destroying it. Entitlements are left intact, so restoring returns access to exactly whoever had it.';

-- Every content policy funnels through has_module() -- lessons, lesson_sections, media,
-- lesson_media and the storage bucket all resolve entitlement through it. Teaching this
-- one function about archiving therefore hides an archived module's whole tree at once,
-- rather than having each policy learn the rule separately and drift apart.
create or replace function private.has_module(m integer)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select private.is_admin() or exists (
    select 1
    from public.entitlements e
    join public.modules mo on mo.id = e.module_id
    where e.module_id = m
      and e.member_id = private.current_member_id()
      and e.cancelled_at is null
      and mo.archived_at is null
  )
$function$;

drop policy if exists modules_admin_insert on public.modules;
drop policy if exists modules_admin_update on public.modules;
drop policy if exists modules_admin_delete on public.modules;

create policy modules_admin_insert on public.modules
  for insert to authenticated with check (private.is_admin());

create policy modules_admin_update on public.modules
  for update to authenticated using (private.is_admin()) with check (private.is_admin());

create policy modules_admin_delete on public.modules
  for delete to authenticated using (private.is_admin());
