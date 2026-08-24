import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const rootEl = document.getElementById("root")!;

/**
 * A configuration mistake used to show a blank white page with nothing but a console
 * error. Vite inlines VITE_* values at build time, so if they are missing when Pages
 * builds, lib/supabase.ts throws while its module is still evaluating -- before React
 * ever mounts. Nothing renders and the cause is invisible to whoever is looking at it.
 */
function showStartupError(detail: string) {
  rootEl.replaceChildren();

  const wrap = document.createElement("div");
  wrap.setAttribute("role", "alert");
  wrap.style.cssText =
    "min-height:100vh;display:flex;align-items:center;justify-content:center;" +
    "padding:24px;background:#2A1A2E;color:#F4EFEA;" +
    "font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;line-height:1.6";

  const card = document.createElement("div");
  card.style.cssText =
    "max-width:34rem;border:1px solid rgba(214,188,140,.4);border-radius:2px;padding:28px 32px";

  const h = document.createElement("h1");
  h.textContent = "This site isn't configured yet";
  h.style.cssText = "margin:0 0 12px;font-size:1.35rem;font-weight:600;color:#E8C98A";

  const p = document.createElement("p");
  p.textContent =
    "The member portal couldn't start. This is a deployment setting, not a problem " +
    "with your account -- signing in again won't help.";
  p.style.cssText = "margin:0 0 16px;font-size:.95rem;color:#C9B8CE";

  const pre = document.createElement("pre");
  pre.textContent = detail;
  pre.style.cssText =
    "margin:0;padding:12px 14px;border-radius:2px;background:rgba(0,0,0,.28);" +
    "font-size:.8rem;white-space:pre-wrap;word-break:break-word;color:#F4EFEA";

  card.append(h, p, pre);
  wrap.append(card);
  rootEl.append(wrap);
}

// App is imported dynamically so that a failure anywhere in its module graph is a
// catchable rejection rather than an uncaught top-level throw. With a static import the
// whole graph is evaluated before any code here runs, so a try/catch could never see it.
import("./App")
  .then(({ default: App }) => {
    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  })
  .catch((err: unknown) => {
    console.error("Member portal failed to start:", err);
    showStartupError(err instanceof Error ? err.message : String(err));
  });
