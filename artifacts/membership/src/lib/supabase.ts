import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Name the variables that are actually absent. Reporting both whenever either is missing
// sends whoever is fixing it to re-check settings that were already correct.
const missing = [
  ["VITE_SUPABASE_URL", url] as const,
  ["VITE_SUPABASE_PUBLISHABLE_KEY", key] as const,
]
  .filter(([, value]) => !value)
  .map(([name]) => name);

if (missing.length > 0) {
  const one = missing.length === 1;
  throw new Error(
    `${missing.join(" and ")} ${one ? "was" : "were"} not available when this site was ` +
      `built.\n\n` +
      `Vite compiles VITE_* values into the bundle at build time, so saving ${one ? "it" : "them"} ` +
      `in Cloudflare Pages -> Settings -> Variables and Secrets does not change an existing ` +
      `deployment. Set ${one ? "it" : "them"} on the Production list as type Text, then use ` +
      `Deployments -> Retry deployment.`,
  );
}

/**
 * This key is safe in the browser. Every table is protected by Row Level Security,
 * so what a member can read is decided by the database against their session,
 * not by anything this client asks for.
 */
export const supabase = createClient(url!, key!, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
