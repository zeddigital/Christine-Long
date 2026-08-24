import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { fetchAllModules, inviteMember } from "@/lib/admin";
import { SERIES_LABEL, type Series } from "@/lib/types";
import { Spinner } from "@/components/Bits";

const ORDER: Series[] = ["transformation", "savvy_start_up", "itbiy", "bonus"];

export default function AdminInvite() {
  const [, navigate] = useLocation();
  const mods = useQuery({ queryKey: ["all-modules"], queryFn: fetchAllModules });
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [picked, setPicked] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ existing: boolean; granted: number } | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await inviteMember({
        email,
        first_name: first,
        last_name: last,
        module_ids: picked,
      });
      setDone({ existing: r.existing_login, granted: r.modules_granted });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (done)
    return (
      <div className="mx-auto max-w-lg rounded-sm border border-line bg-surface p-8 text-center">
        <h1 className="font-serif text-3xl text-aubergine">Invitation sent</h1>
        <p className="mt-3 text-plum">
          {done.existing
            ? `${email} already had a login, so we've sent them a link to set a new password.`
            : `${email} will receive an email with a link to set their password.`}
          {done.granted > 0 && ` They've been given ${done.granted} module${done.granted === 1 ? "" : "s"}.`}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/admin"
            className="rounded-sm bg-aubergine px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-porcelain no-underline"
          >
            Back to members
          </Link>
          <button
            onClick={() => {
              setDone(null);
              setEmail("");
              setFirst("");
              setLast("");
              setPicked([]);
            }}
            className="rounded-sm border border-line px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-aubergine"
          >
            Add another
          </button>
        </div>
      </div>
    );

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div>
        <Link href="/admin" className="text-xs uppercase tracking-[0.14em] text-champagne no-underline">
          ← Members
        </Link>
        <h1 className="mt-4 font-serif text-4xl leading-none text-aubergine">Add a member</h1>
        <p className="mt-3 text-plum">
          They'll get an email inviting them to set a password. Nothing is sent to anyone else.
        </p>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-mute">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-sm border border-line bg-surface px-3 py-2.5"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-mute">First name</span>
            <input
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              className="rounded-sm border border-line bg-surface px-3 py-2.5"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-mute">Last name</span>
            <input
              value={last}
              onChange={(e) => setLast(e.target.value)}
              className="rounded-sm border border-line bg-surface px-3 py-2.5"
            />
          </label>
        </div>

        <fieldset className="flex flex-col gap-4">
          <legend className="text-xs font-bold uppercase tracking-[0.12em] text-mute">
            Modules to give them {picked.length > 0 && `(${picked.length} selected)`}
          </legend>
          {mods.isLoading ? (
            <Spinner label="Loading modules" />
          ) : (
            ORDER.map((s) => {
              const items = (mods.data ?? []).filter((m) => m.series === s);
              if (!items.length) return null;
              return (
                <div key={s}>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-champagne">
                    {SERIES_LABEL[s]}
                  </p>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {items.map((m) => (
                      <label
                        key={m.id}
                        className="flex cursor-pointer items-start gap-2 rounded-sm border border-line bg-surface px-3 py-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={picked.includes(m.id)}
                          onChange={(e) =>
                            setPicked((p) =>
                              e.target.checked ? [...p, m.id] : p.filter((x) => x !== m.id),
                            )
                          }
                          className="mt-0.5"
                        />
                        <span>{m.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </fieldset>

        {error && (
          <p role="alert" className="rounded-sm bg-rose/15 px-3 py-2 text-sm text-rose">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="self-start rounded-sm bg-aubergine px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-porcelain disabled:opacity-60"
        >
          {busy ? "Sending…" : "Send invitation"}
        </button>
      </form>
    </div>
  );
}
