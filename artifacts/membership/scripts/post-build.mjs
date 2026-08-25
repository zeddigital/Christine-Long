// Cloudflare Pages reads _redirects and _headers from the root of the output directory,
// not from the sub-path the app is served under, so they are written here after the build.
import { writeFileSync, mkdirSync, copyFileSync } from "node:fs";

mkdirSync("dist", { recursive: true });

writeFileSync(
  "dist/_redirects",
  [
    "# Bare domain (e.g. the *.pages.dev preview) lands on the member area.",
    "/                     /membership-site/            302",
    "",
    // The obvious SPA rule here would be:
    //   /membership-site/*  /membership-site/index.html  200
    // Cloudflare rejects it -- the destination is itself matched by the source glob, so
    // its loop detector drops the rule and the deploy log reports it as invalid. Deep
    // links then hard-404. The fallback below handles it instead; see the note there.
    "",
  ].join("\n"),
);

// Client-side routes such as /membership-site/admin have no file behind them, so a
// direct hit or a refresh must still be served the app shell. Pages serves the nearest
// 404.html when no asset matches, which does that without a rewrite rule -- and, unlike
// a rewrite, it can never shadow a real asset, since it only applies once asset lookup
// has already failed. The trade-off is that a deep link returns a 404 status while
// rendering correctly; the portal is noindex and private, so nothing depends on the code.
copyFileSync("dist/membership-site/index.html", "dist/membership-site/404.html");
copyFileSync("dist/membership-site/index.html", "dist/404.html");

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

console.log("wrote dist/_redirects, dist/_headers and the 404.html app-shell fallback");
