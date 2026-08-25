// Client-side routes (/about, /programs, ...) have no file behind them, so a direct hit or
// a refresh must still be served the app shell. Cloudflare Pages serves the nearest
// 404.html when no asset matches, which does that without a redirect rule -- and unlike a
// rewrite it cannot shadow a real asset, because it only applies once asset lookup has
// already failed.
//
// The obvious alternative, a _redirects line of "/*  /index.html  200", is rejected by
// Cloudflare: the destination is matched by its own source glob, so the rule is dropped as
// an infinite loop and every deep link 404s anyway.
import { copyFileSync } from 'node:fs';

copyFileSync('dist/public/index.html', 'dist/public/404.html');
console.log('wrote dist/public/404.html (SPA fallback)');
