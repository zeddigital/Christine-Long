// Vite inlines VITE_* values into the bundle at build time, so a build that runs without
// them produces a site that cannot start no matter what is configured afterwards. The
// failure is otherwise invisible until someone loads the page, so it is reported here
// where the Cloudflare build log will show it.
//
// This warns rather than fails: the app renders its own explanation at runtime, and a
// hard failure would leave the previous deployment in place with no new log to read.
const REQUIRED = ["VITE_SUPABASE_URL", "VITE_SUPABASE_PUBLISHABLE_KEY"];

const missing = REQUIRED.filter((name) => !process.env[name]);

if (missing.length === 0) {
  console.log(`env: ${REQUIRED.join(", ")} present -- building a working bundle.`);
} else {
  const line = "=".repeat(72);
  console.warn(
    [
      "",
      line,
      "  WARNING: building WITHOUT " + missing.join(" and "),
      line,
      "",
      "  Cloudflare did not pass these into the build environment, so Vite will",
      "  inline them as undefined and the deployed site will refuse to start.",
      "",
      "  Because this ran at all, Cloudflare IS reading the build command -- so the",
      "  variables are missing, misnamed, or set on the other environment. Check:",
      "",
      "    - Settings -> Variables and Secrets, on the PRODUCTION list (Preview is",
      "      a separate list; adding to one does not add to the other)",
      "    - names match exactly, including case and no trailing spaces",
      "    - type is Text, not Secret -- these are compiled into the public bundle,",
      "      so Secret hides the value from you without protecting anything",
      "",
      "  Then use Deployments -> Retry deployment. Saving a variable does not",
      "  rebuild an existing deployment.",
      line,
      "",
    ].join("\n"),
  );
}
