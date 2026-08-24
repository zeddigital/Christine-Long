import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Check, X } from "lucide-react";
import {
  fetchAllModules,
  fetchGrants,
  fetchMember,
  fetchMemberProgress,
  grantModule,
  revokeModule,
} from "@/lib/admin";
import { SERIES_LABEL, type Series } from "@/lib/types";
import { Empty, ProgressBar, Spinner } from "@/components/Bits";
import { supabase } from "@/lib/supabase";

const ORDER: Series[] = ["transformation", "savvy_start_up", "itbiy", "bonus"];
const date = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) : "—";

export default function AdminMemberDetail() {
  const [, params] = useRoute("/admin/members/:id");
  const id = Number(params?.id);
  const qc = useQueryClient();
  const [pending, setPending] = useState<number | null>(null);

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
        <Link href="/admin" className="text-xs uppercase tracking-[0.14em] text-champagne no-underline">
          ← Members
        </Link>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-aubergine">
          {[m.first_name, m.last_name].filter(Boolean).join(" ") || m.email}
        </h1>
        <p className="mt-2 font-mono text-sm text-plum">{m.email}</p>
        <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3 text-sm">
          {[
            ["Status", m.status],
            ["Modules", String(m.modules_held)],
            ["Lessons completed", String(m.lessons_completed)],
            ["Member since", date(m.created_at)],
            ["Last active", date(m.last_activity)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-mute">{k}</dt>
              <dd className="mt-0.5 text-charcoal">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-champagne">
          Module access
        </h2>
        <p className="-mt-2 max-w-prose text-sm text-plum">
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
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-mute">
                  {SERIES_LABEL[s]}
                </p>
                <ul className="flex flex-col overflow-hidden rounded-sm border border-line">
                  {items.map((mod) => {
                    const g = live.get(mod.id);
                    const has = !!g;
                    const total = lessonCounts.data?.get(mod.id) ?? 0;
                    const done = doneByModule.get(mod.id) ?? 0;
                    return (
                      <li
                        key={mod.id}
                        className="flex flex-wrap items-center gap-3 border-b border-line bg-surface px-4 py-3 last:border-0"
                      >
                        <button
                          onClick={() => change.mutate({ moduleId: mod.id, give: !has })}
                          disabled={pending === mod.id}
                          aria-pressed={has}
                          aria-label={`${has ? "Remove" : "Give"} ${mod.name}`}
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border disabled:opacity-40 ${
                            has
                              ? "border-champagne bg-champagne text-white"
                              : "border-line bg-subtle text-transparent hover:border-champagne"
                          }`}
                        >
                          {has ? <Check size={13} strokeWidth={3} /> : <X size={13} />}
                        </button>
                        <span className="min-w-0 flex-1 text-sm text-charcoal">{mod.name}</span>
                        {has && (
                          <>
                            <span className="text-xs text-mute">given {date(g!.granted_at)}</span>
                            <span className="w-32">
                              <ProgressBar done={done} total={total} />
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
    </div>
  );
}
