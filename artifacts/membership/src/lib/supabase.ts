import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. " +
      "Set both in Cloudflare Pages → Settings → Environment variables.",
  );
}

/**
 * This key is safe in the browser. Every table is protected by Row Level Security,
 * so what a member can read is decided by the database against their session,
 * not by anything this client asks for.
 */
export const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
