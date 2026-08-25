-- The modules screen needs a lesson count and a "how many members hold this" count per
-- module. Doing it client-side would mean pulling all 561 lesson rows to count them.
--
-- security_invoker so the view carries the caller's own permissions rather than the
-- definer's: an admin sees every module, a member still sees only what they hold, and
-- archiving keeps working through has_module() exactly as it does on the table.
create or replace view public.module_overview
with (security_invoker = true) as
select
  m.id,
  m.name,
  m.slug,
  m.series,
  m.summary,
  m.sort_order,
  m.archived_at,
  (select count(*) from public.lessons l where l.module_id = m.id) as lesson_count,
  (select count(*) from public.entitlements e
    where e.module_id = m.id and e.cancelled_at is null) as members_holding
from public.modules m;

comment on view public.module_overview is
  'Modules with lesson and live-entitlement counts, for the admin module screen.';
