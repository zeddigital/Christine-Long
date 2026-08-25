import { createClient } from "@supabase/supabase-js";

// Trimmed because a value pasted into a dashboard field often carries a trailing space or
// newline, which survives into the bundle and produces requests to a host that cannot
// resolve -- surfacing only as an unexplained "Failed to fetch" in the browser.
const url = String(import.meta.env.VITE_SUPABASE_URL ?? "").trim();
const key = String(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "").trim();

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

let parsed: URL;
try {
  parsed = new URL(url);
} catch {
  throw new Error(
    `VITE_SUPABASE_URL is not a valid URL.\n\nThis build was given: "${url}"\n\n` +
      `It should look like https://<project-ref>.supabase.co`,
  );
}

/** Shown when a request cannot reach Supabase, so a wrong host is visible rather than guessed. */
export const SUPABASE_HOST = parsed.host;

/**
 * This key is safe in the browser. Every table is protected by Row Level Security,
 * so what a member can read is decided by the database against their session,
 * not by anything this client asks for.
 */
// parsed.origin rather than the raw value: it normalises away a trailing slash or a
// stray path, either of which would otherwise be folded into every request path.
export const supabase = createClient(parsed.origin, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
