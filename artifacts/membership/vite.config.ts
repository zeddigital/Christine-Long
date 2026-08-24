import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Served from https://www.anewyou.com.au/membership-site — the same path the WordPress
// membership area used, so existing member links keep resolving.
//
// The build writes into dist/membership-site/ rather than dist/ so the files sit at the
// same path the HTML references them by. Deployed to a bare *.pages.dev domain or behind
// a Cloudflare route on the real domain, the asset URLs resolve either way.
export default defineConfig({
  base: "/membership-site/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
  build: { outDir: "dist/membership-site", emptyOutDir: true, sourcemap: true },
});
