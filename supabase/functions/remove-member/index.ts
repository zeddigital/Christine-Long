import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Removing a member has to delete their login as well as their record. Deleting only the
// members row leaves an orphaned account that can still sign in -- it just lands on "your
// account isn't linked yet" forever. Deleting a login needs the service role key, so it
// runs here rather than in the browser, and admin status is re-checked against the
// database first: holding a valid member token is not enough.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Use POST" }, 405);

  const url = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authHeader = req.headers.get("Authorization") ?? "";

  const caller = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData } = await caller.auth.getUser();
  if (!userData?.user) return json({ error: "Not signed in." }, 401);

  const admin = createClient(url, serviceKey);

  const { data: me } = await admin
    .from("members")
    .select("id,is_admin")
    .eq("auth_user_id", userData.user.id)
    .maybeSingle();
  if (!me?.is_admin) return json({ error: "Admins only." }, 403);

  let body: { member_id?: number };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Expected a JSON body." }, 400);
  }

  const memberId = Number(body.member_id);
  if (!Number.isInteger(memberId)) return json({ error: "member_id is required." }, 400);

  // Removing yourself would lock you out of the admin area with no way back in.
  if (memberId === me.id) {
    return json({ error: "You can't remove your own account." }, 400);
  }

  const { data: target } = await admin
    .from("members")
    .select("id,email,auth_user_id,is_admin")
    .eq("id", memberId)
    .maybeSingle();
  if (!target) return json({ error: "That member no longer exists." }, 404);

  // Losing the last administrator would leave nobody able to invite or grant access.
  if (target.is_admin) {
    const { count } = await admin
      .from("members")
      .select("id", { count: "exact", head: true })
      .eq("is_admin", true);
    if ((count ?? 0) <= 1) {
      return json({ error: "This is the last administrator, so it can't be removed." }, 400);
    }
  }

  // The member row first: entitlements and progress cascade with it. If deleting the
  // login then fails, the account is already inert -- it resolves to no member, so it
  // carries no access -- which is a safer half-finished state than the reverse.
  const { error: rowErr } = await admin.from("members").delete().eq("id", memberId);
  if (rowErr) return json({ error: `Could not remove the member: ${rowErr.message}` }, 400);

  let loginRemoved = false;
  if (target.auth_user_id) {
    const { error: authErr } = await admin.auth.admin.deleteUser(target.auth_user_id);
    if (authErr) {
      return json({
        ok: true,
        member_id: memberId,
        email: target.email,
        login_removed: false,
        warning: `The member record was removed, but their login could not be deleted: ${authErr.message}`,
      });
    }
    loginRemoved = true;
  }

  return json({ ok: true, member_id: memberId, email: target.email, login_removed: loginRemoved });
});
