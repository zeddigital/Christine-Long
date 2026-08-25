# Supabase backend — A New You membership portal

The database and Edge Functions behind `artifacts/membership`. These files were exported
from the live project so the security model is reviewable in the repo rather than only in
the Supabase dashboard.

- **Project ref:** `nvinwutyhybukabwcjmi` (region `ap-southeast-2`)
- **Plan:** Free — see *Constraints* below

## What is here

```
migrations/    11 migrations, applied in filename order
functions/     invite-member, remove-member (Deno, deployed as Edge Functions)
config.toml    CLI config; both functions require a valid JWT
```

## These migrations create the schema, not the content

**Applying them to a fresh project gives you an empty site.** The programme —
33 modules, 561 lessons, 1,184 sections, 305 media records and 108 entitlements — was
loaded from the WordPress export by a separate one-off migration process, not by these
files. The 225 media files live in the `media` storage bucket and are not in the repo
either (779 MB).

To stand up a copy with content you need both these migrations *and* a data dump of the
live project.

## How access control works

Everything funnels through three functions in the `private` schema. They live there rather
than in `public` so PostgREST cannot expose them as `/rest/v1/rpc/...` endpoints.

| Function | Answers |
|---|---|
| `private.current_member_id()` | which member is this session, if any |
| `private.is_admin()` | is that member an administrator |
| `private.has_module(id)` | may that member see this module |

Two consequences worth knowing before changing anything:

- **Every content policy** — `lessons`, `lesson_sections`, `media`, `lesson_media` and the
  storage bucket — resolves entitlement through `has_module()`. Changing that one function
  changes what members can see everywhere at once. That is how module archiving works.
- **`current_member_id()` and `is_admin()` ignore members whose status is `inactive`.** That
  is what makes deactivation real rather than cosmetic; an inactive account resolves to no
  member and therefore holds nothing.

### The trigger on `members`

`members_guard_columns` is a `BEFORE UPDATE` trigger that silently reverts changes to
`is_admin`, `status`, `email`, `auth_user_id`, `wp_user_id`, `notes` and `created_at` for
anyone who is not an admin or the service role.

It exists because Postgres row policies cannot restrict *which columns* an update touches:
without it, a member could `PATCH is_admin=true` on their own row and take over the site.
**Do not remove or relax it.**

Note that it reverts silently rather than erroring. A `UPDATE members SET auth_user_id=...`
run from the SQL editor appears to succeed and does nothing, because `auth.uid()` is NULL
there and the guard treats the caller as an ordinary member. Set the service-role claim
first if you need to do this by hand:

```sql
select set_config('request.jwt.claims', '{"role":"service_role"}', true);
```

## Content tables are read-only

`modules` now has admin insert/update/delete policies. `lessons`, `lesson_sections`,
`media` and `lesson_media` still have **only a SELECT policy** — nobody can write to them
through the API, including admins. Editing lesson content or managing files means adding
write policies and a UI for them; neither exists yet.

Note the asymmetry: admins *can* upload and delete objects in the `media` storage bucket,
but cannot create the `media` row that tells the app a file exists. Uploading a file today
will not make it visible to members.

## Deletes cascade

Every foreign key onto `members`, `modules` and `media` is `ON DELETE CASCADE`. Deleting
one module destroys its lessons, their sections and every entitlement to it. Deleting a
member destroys their progress history. The admin UI therefore offers archive and
deactivate as the primary actions and puts both deletes behind a typed confirmation.

## Edge Functions

Both require a valid JWT *and* re-check admin status against the database — holding a
member token is not sufficient.

- **`invite-member`** — creates or re-invites a login and links it to a member record,
  optionally granting modules. Reads `MEMBER_SITE_URL` for the redirect target and falls
  back to `https://www.anewyou.com.au`, so it must be set per environment or invitations
  point at the wrong origin.
- **`remove-member`** — deletes a member's login and record. Refuses to remove the
  caller's own account or the last remaining administrator.

## Auth configuration

Not captured in these files — set in the dashboard under Authentication → URL
Configuration. Both the site URL and the redirect allow-list must include the origin being
used, or password resets and invitations silently fall back to the site URL.

## Constraints (Free tier)

| | Limit | Current |
|---|---|---|
| File storage | 1 GB | 779 MB |
| Max file size | 50 MB | |
| Egress | 5 GB/month | |
| Database | 500 MB | ~13 MB |
| Auto-pause | ~7 days idle | applies |

Do not bulk-upload content: roughly 245 MB of headroom remains. The project pauses itself
after about a week of inactivity and restores from the dashboard with no data loss, but
the site is down until someone does it.
