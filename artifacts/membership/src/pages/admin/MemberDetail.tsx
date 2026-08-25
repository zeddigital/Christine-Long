import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Check, Trash2, UserMinus, UserPlus, X } from "lucide-react";
import {
  fetchAllModules,
  fetchGrants,
  fetchMember,
  fetchMemberProgress,
  grantModule,
  removeMember,
  revokeModule,
  setMemberStatus,
} from "@/lib/admin";
import { SERIES_LABEL, type Series } from "@/lib/types";
import { Empty, LessonRail, Spinner } from "@/components/Bits";
import { supabase } from "@/lib/supabase";

const ORDER: Series[] = ["transformation", "savvy_start_up", "itbiy", "bonus"];
const date = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) : "—";

export default function AdminMemberDetail() {
  const [, params] = useRoute("/admin/members/:id");
  const id = Number(params?.id);
  const qc = useQueryClient();
  const [pending, setPending] = useState<number | null>(null);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [, navigate] = useLocation();

  const member = useQuery({ queryKey: ["admin-member", id], queryFn: () => fetchMember(id) });
  const grants = useQuery({ queryKey: ["grants", id], queryFn: () => fetchGrants(id) });
  const mods = useQuery({ queryKey: ["all-modules"], queryFn: fetchAllModules });
  const progress = useQuery({ queryKey: ["member-progress", id], queryFn: () => fetchMemberProgress(id) });
  const lessonCounts = useQuery({
    queryKey: ["lesson-counts-all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("lessons").select("id,module_id");
      if (error) throw error;
      const m = new Map<number, number>();
      for (const l of data ?? []) m.set(l.module_id, (m.get(l.module_id) ?? 0) + 1);
      return m;
    },
  });

  const change = useMutation({
    mutationFn: async ({ moduleId, give }: { moduleId: number; give: boolean }) => {
      setPending(moduleId);
      if (give) await grantModule(id, moduleId);
      else await revokeModule(id, moduleId);
    },
    onSettled: async () => {
      setPending(null);
      await qc.invalidateQueries({ queryKey: ["grants", id] });
      await qc.invalidateQueries({ queryKey: ["admin-member", id] });
      await qc.invalidateQueries({ queryKey: ["admin-members"] });
    },
  });

  const status = useMutation({
    mutationFn: (next: "active" | "inactive") => setMemberStatus(id, next),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin-member", id] });
      await qc.invalidateQueries({ queryKey: ["admin-members"] });
    },
    onError: (e: Error) => setAdminError(e.message),
  });

  const remove = useMutation({
    mutationFn: () => removeMember(id),
    onSuccess: async (res) => {
      await qc.invalidateQueries({ queryKey: ["admin-members"] });
      if (res.warning) setAdminError(res.warning);
      else navigate("/admin");
    },
    onError: (e: Error) => {
      setConfirmRemove(false);
      setAdminError(e.message);
    },
  });

  if (member.isLoading) return <Spinner />;
  if (!member.data) return <Empty title="Member not found" />;

  const m = member.data;
  const live = new Map(
    (grants.data ?? []).filter((g) => !g.cancelled_at).map((g) => [g.module_id, g]),
  );
  const doneByModule = new Map<number, number>();
  for (const p of progress.data ?? []) {
    if (p.lessons) doneByModule.set(p.lessons.module_id, (doneByModule.get(p.lessons.module_id) ?? 0) + 1);
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/admin" className="text-xs uppercase tracking-[0.14em] text-gold no-underline">
          ← Members
        </Link>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink">
          {[m.first_name, m.last_name].filter(Boolean).join(" ") || m.email}
        </h1>
        <p className="mt-2 font-mono text-sm text-ink-soft">{m.email}</p>
        <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3 text-sm">
          {[
            ["Status", m.status],
            ["Modules", String(m.modules_held)],
            ["Lessons completed", String(m.lessons_completed)],
            ["Member since", date(m.created_at)],
            ["Last active", date(m.last_activity)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-faint">{k}</dt>
              <dd className="mt-0.5 text-ink-soft">{v}</dd>
            </div>
          ))}
        </dl>

        {adminError && (
          <p role="alert" className="mt-5 rounded-sm border border-rose/40 bg-rose/10 px-4 py-3 text-sm text-rose">
            {adminError}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setAdminError(null);
              status.mutate(m.status === "inactive" ? "active" : "inactive");
            }}
            disabled={status.isPending}
            className="flex items-center gap-2 rounded-sm border border-rule px-4 py-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-gold hover:text-ink disabled:opacity-40"
          >
            {m.status === "inactive" ? <UserPlus size={14} /> : <UserMinus size={14} />}
            {status.isPending
              ? "Saving…"
              : m.status === "inactive"
                ? "Reactivate"
                : "Deactivate"}
          </button>
          <button
            onClick={() => {
              setAdminError(null);
              setConfirmRemove(true);
            }}
            className="flex items-center gap-2 rounded-sm px-3 py-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-faint transition-colors hover:text-rose"
          >
            <Trash2 size={14} />
            Remove
          </button>
          <p className="text-xs text-ink-faint">
            {m.status === "inactive"
              ? "Deactivated: signing in works, but they hold no modules until reactivated."
              : "Deactivating keeps everything and can be undone. Removing cannot."}
          </p>
        </div>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
          Module access
        </h2>
        <p className="-mt-2 max-w-prose text-sm text-ink-soft">
          Ticking a module gives them access immediately. Removing it withdraws access but keeps the
          record, so you can always see what they once had.
        </p>

        {mods.isLoading || grants.isLoading ? (
          <Spinner label="Loading access" />
        ) : (
          ORDER.map((s) => {
            const items = (mods.data ?? []).filter((x) => x.series === s);
            if (!items.length) return null;
            return (
              <div key={s} className="flex flex-col gap-2">
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint">
                  {SERIES_LABEL[s]}
                </p>
                <ul className="flex flex-col overflow-hidden rounded-sm border border-rule">
                  {items.map((mod) => {
                    const g = live.get(mod.id);
                    const has = !!g;
                    const total = lessonCounts.data?.get(mod.id) ?? 0;
                    const done = doneByModule.get(mod.id) ?? 0;
                    return (
                      <li
                        key={mod.id}
                        className="flex flex-wrap items-center gap-3 border-b border-rule bg-panel px-4 py-3 last:border-0"
                      >
                        <button
                          onClick={() => change.mutate({ moduleId: mod.id, give: !has })}
                          disabled={pending === mod.id}
                          aria-pressed={has}
                          aria-label={`${has ? "Remove" : "Give"} ${mod.name}`}
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border disabled:opacity-40 ${
                            has
                              ? "border-gold bg-gold text-ground"
                              : "border-rule bg-panel-lift text-transparent hover:border-gold"
                          }`}
                        >
                          {has ? <Check size={13} strokeWidth={3} /> : <X size={13} />}
                        </button>
                        <span className="min-w-0 flex-1 text-sm text-ink-soft">{mod.name}</span>
                        {has && (
                          <>
                            <span className="text-xs text-ink-faint">given {date(g!.granted_at)}</span>
                            <span className="w-32">
                              <LessonRail done={done} total={total} />
                            </span>
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })
        )}
      </section>
      {confirmRemove && (
        <RemoveMember
          name={[m.first_name, m.last_name].filter(Boolean).join(" ") || m.email}
          email={m.email}
          lessonsCompleted={m.lessons_completed}
          busy={remove.isPending}
          onCancel={() => setConfirmRemove(false)}
          onConfirm={() => remove.mutate()}
        />
      )}
    </div>
  );
}

/**
 * Removing a member deletes their login and their record, and their entitlements and
 * progress cascade with it. Deactivating is the reversible option and is offered here
 * too, because it is usually what was meant.
 */
function RemoveMember({
  name,
  email,
  lessonsCompleted,
  busy,
  onCancel,
  onConfirm,
}: {
  name: string;
  email: string;
  lessonsCompleted: number;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [typed, setTyped] = useState("");
  const matches = typed.trim().toLowerCase() === email.toLowerCase();

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ground-deep/80 px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="remove-member-title"
    >
      <div className="w-full max-w-md rounded-sm border border-rule bg-panel p-7">
        <h2 id="remove-member-title" className="font-serif text-2xl text-ink">
          Remove {name}?
        </h2>
        <p className="mt-3 text-sm text-ink-soft">This permanently deletes:</p>
        <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-soft">
          <li>· their login, so they can no longer sign in</li>
          <li>· their module access</li>
          <li>
            · their progress, including{" "}
            <span className="tabular-nums text-ink">{lessonsCompleted}</span> completed{" "}
            {lessonsCompleted === 1 ? "lesson" : "lessons"}
          </li>
        </ul>
        <p className="mt-3 text-sm text-ink-soft">
          It cannot be undone. To cut off access but keep their record, cancel and deactivate them
          instead.
        </p>

        <label className="mt-5 flex flex-col gap-1.5">
          <span className="text-xs text-ink-faint">
            Type <span className="text-ink">{email}</span> to confirm
          </span>
          <input
            autoFocus
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            className="rounded-sm border border-rule bg-ground px-3 py-2 text-sm text-ink"
          />
        </label>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onCancel} className="px-3 py-2 text-sm text-ink-soft hover:text-ink">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!matches || busy}
            className="rounded-sm bg-rose px-4 py-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ground disabled:opacity-40"
          >
            {busy ? "Removing…" : "Remove permanently"}
          </button>
        </div>
      </div>
    </div>
  );
}
