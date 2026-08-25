import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Creating a login requires the service role key, which must never reach the browser.
// This runs server-side: it re-checks that the caller is an admin against the database
// before doing anything, so holding a valid member token is not enough.

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

  // Who is calling?
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

  let body: { email?: string; first_name?: string; last_name?: string; module_ids?: number[] };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Expected a JSON body." }, 400);
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: "That doesn't look like a valid email address." }, 400);
  }

  const redirectTo = (Deno.env.get("MEMBER_SITE_URL") ?? "https://www.anewyou.com.au") +
    "/membership-site/";

  // Existing member record, if any — the WordPress import created 29 of them.
  const { data: existing } = await admin
    .from("members")
    .select("id,auth_user_id")
    .ilike("email", email)
    .maybeSingle();

  // Invite (or re-invite) the login.
  let authUserId = existing?.auth_user_id ?? null;
  const { data: invited, error: inviteErr } = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo,
  });

  if (inviteErr) {
    const already = inviteErr.message?.toLowerCase().includes("already");
    if (!already) return json({ error: `Could not send the invitation: ${inviteErr.message}` }, 400);
    // Already has a login — send a password-set link instead so the invite is still useful.
    const { data: link, error: linkErr } = await admin.auth.admin.generateLink({
      type: "recovery",
      email,
      options: { redirectTo },
    });
    if (linkErr) return json({ error: `Could not send the reset link: ${linkErr.message}` }, 400);
    authUserId = link.user?.id ?? authUserId;
  } else {
    authUserId = invited.user?.id ?? authUserId;
  }

  // Create or update the member record and link it to the login.
  const payload = {
    email,
    first_name: body.first_name?.trim() || null,
    last_name: body.last_name?.trim() || null,
    auth_user_id: authUserId,
    status: "invited",
  };

  let memberId = existing?.id ?? null;
  if (memberId) {
    await admin.from("members").update(payload).eq("id", memberId);
  } else {
    const { data: created, error: createErr } = await admin
      .from("members")
      .insert(payload)
      .select("id")
      .single();
    if (createErr) return json({ error: `Could not save the member: ${createErr.message}` }, 400);
    memberId = created.id;
  }

  // Optional: grant modules at the same time.
  const moduleIds = Array.isArray(body.module_ids) ? body.module_ids.filter(Number.isInteger) : [];
  if (moduleIds.length && memberId) {
    await admin.from("entitlements").upsert(
      moduleIds.map((module_id) => ({ member_id: memberId, module_id, source: "manual" })),
      { onConflict: "member_id,module_id", ignoreDuplicates: true },
    );
  }

  return json({
    ok: true,
    member_id: memberId,
    email,
    modules_granted: moduleIds.length,
    existing_login: !!inviteErr,
  });
});
