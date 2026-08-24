// Cloudflare Pages reads _redirects and _headers from the root of the output directory,
// not from the sub-path the app is served under, so they are written here after the build.
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("dist", { recursive: true });

writeFileSync(
  "dist/_redirects",
  [
    "# Bare domain (e.g. the *.pages.dev preview) lands on the member area.",
    "/                     /membership-site/            302",
    "",
    "# Single-page app: every member route is served by index.html.",
    "/membership-site/*    /membership-site/index.html  200",
    "",
  ].join("\n"),
);

writeFileSync(
  "dist/_headers",
  [
    "/*",
    "  X-Frame-Options: DENY",
    "  X-Content-Type-Options: nosniff",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    "  Permissions-Policy: geolocation=(), microphone=(), camera=()",
    "",
    "# Hashed asset filenames change on every build, so they can be cached hard.",
    "/membership-site/assets/*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "",
    "# The shell must not be cached, or members get yesterday's build.",
    "/membership-site/index.html",
    "  Cache-Control: no-cache",
    "",
  ].join("\n"),
);

console.log("wrote dist/_redirects and dist/_headers");
