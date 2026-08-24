import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

type Mode = "signin" | "reset";

export default function Login() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/membership-site/`,
        });
        if (error) throw error;
        setSent(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(
        msg.toLowerCase().includes("invalid login")
          ? "That email and password don't match. If you've come from the old site, choose “Set or reset my password”."
          : msg,
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-aubergine px-6 py-16">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="text-center font-serif text-4xl leading-none text-porcelain">A New You</h1>
        <p className="mt-3 text-center text-sm text-plum">
          {mode === "reset" ? "We'll email you a link to set a new password." : "Sign in to your programme."}
        </p>

        {sent ? (
          <div className="mt-8 rounded-sm border border-champagne/40 bg-aubergine/60 px-5 py-6 text-center">
            <p className="text-sm text-porcelain">
              Check <strong className="text-champagne-bright">{email}</strong> for a link to set your password.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setMode("signin");
              }}
              className="mt-4 text-xs text-champagne-bright underline"
            >
              Back to sign in
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-plum">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-sm border border-plum/40 bg-porcelain/5 px-3 py-2.5 text-porcelain placeholder:text-plum/60"
              />
            </label>

            {mode === "signin" && (
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-plum">Password</span>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-sm border border-plum/40 bg-porcelain/5 px-3 py-2.5 text-porcelain"
                />
              </label>
            )}

            {error && (
              <p role="alert" className="rounded-sm bg-rose/15 px-3 py-2 text-sm text-rose">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-1 rounded-sm bg-champagne px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-aubergine disabled:opacity-60"
            >
              {busy ? "Just a moment…" : mode === "reset" ? "Send the link" : "Sign in"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "reset" : "signin");
                setError(null);
              }}
              className="text-center text-xs text-plum underline hover:text-champagne-bright"
            >
              {mode === "signin" ? "Set or reset my password" : "Back to sign in"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
