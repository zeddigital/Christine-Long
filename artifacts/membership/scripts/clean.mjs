// vite's emptyOutDir only clears dist/membership-site, so the wrapper directory is
// cleaned here to stop stale files from a previous build being served.
import { rmSync } from "node:fs";
rmSync("dist", { recursive: true, force: true });
