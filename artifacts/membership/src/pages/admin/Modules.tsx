import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Archive, ArchiveRestore, Check, Pencil, Trash2, X } from "lucide-react";
import {
  deleteModule,
  fetchModuleOverview,
  renameModule,
  setModuleArchived,
  type ModuleRow,
} from "@/lib/admin";
import { SERIES_LABEL } from "@/lib/types";
import { Empty, Spinner } from "@/components/Bits";

export default function AdminModules() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin-modules"], queryFn: fetchModuleOverview });

  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [confirming, setConfirming] = useState<ModuleRow | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    await qc.invalidateQueries({ queryKey: ["admin-modules"] });
    await qc.invalidateQueries({ queryKey: ["modules"] });
  };

  const archive = useMutation({
    mutationFn: ({ id, archived }: { id: number; archived: boolean }) =>
      setModuleArchived(id, archived),
    onSuccess: refresh,
    onError: (e: Error) => setError(e.message),
  });

  const rename = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => renameModule(id, name),
    onSuccess: async () => {
      setEditing(null);
      await refresh();
    },
    onError: (e: Error) => setError(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: number) => deleteModule(id),
    onSuccess: async () => {
      setConfirming(null);
      await refresh();
    },
    onError: (e: Error) => setError(e.message),
  });

  if (q.isLoading) return <Spinner label="Loading modules" />;
  if (q.error) return <Empty title="We couldn't load the modules" detail={String(q.error)} />;

  const rows = q.data ?? [];
  const live = rows.filter((m) => !m.archived_at).length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-[2.5rem] leading-none tracking-tight text-ink">Modules</h1>
        <p className="mt-3 text-sm text-ink-soft">
          <span className="tabular-nums">{live}</span> live ·{" "}
          <span className="tabular-nums">{rows.length - live}</span> archived. Archiving hides a
          module and everything in it from members, and keeps who had access.
        </p>
      </div>

      {error && (
        <p role="alert" className="rounded-sm border border-rose/40 bg-rose/10 px-4 py-3 text-sm text-rose">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-sm border border-rule">
        <table className="w-full min-w-[46rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-rule bg-panel-lift text-left">
              <th className="px-4 py-3 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                Module
              </th>
              <th className="px-4 py-3 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                Series
              </th>
              <th className="px-4 py-3 text-right text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                Lessons
              </th>
              <th className="px-4 py-3 text-right text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                Members
              </th>
              <th className="px-4 py-3 text-right text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => {
              const archived = !!m.archived_at;
              return (
                <tr
                  key={m.id}
                  className={`border-b border-rule-soft bg-panel last:border-0 ${archived ? "opacity-55" : ""}`}
                >
                  <td className="px-4 py-3">
                    {editing === m.id ? (
                      <span className="flex items-center gap-2">
                        <input
                          autoFocus
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && draft.trim())
                              rename.mutate({ id: m.id, name: draft.trim() });
                            if (e.key === "Escape") setEditing(null);
                          }}
                          className="w-full rounded-sm border border-rule bg-ground px-2 py-1 text-sm text-ink"
                          aria-label={`Rename ${m.name}`}
                        />
                        <button
                          onClick={() => draft.trim() && rename.mutate({ id: m.id, name: draft.trim() })}
                          disabled={!draft.trim() || rename.isPending}
                          className="text-gold hover:text-gold-bright disabled:opacity-40"
                          aria-label="Save name"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="text-ink-faint hover:text-ink"
                          aria-label="Cancel rename"
                        >
                          <X size={16} />
                        </button>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span className="text-ink">{m.name}</span>
                        {archived && (
                          <span className="rounded-sm border border-rule px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                            Archived
                          </span>
                        )}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-ink-faint">{SERIES_LABEL[m.series]}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink-soft">
                    {m.lesson_count}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink-soft">
                    {m.members_holding}
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => {
                          setEditing(m.id);
                          setDraft(m.name);
                        }}
                        className="text-ink-faint transition-colors hover:text-ink"
                        aria-label={`Rename ${m.name}`}
                        title="Rename"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => archive.mutate({ id: m.id, archived: !archived })}
                        disabled={archive.isPending}
                        className="text-ink-faint transition-colors hover:text-gold disabled:opacity-40"
                        aria-label={`${archived ? "Restore" : "Archive"} ${m.name}`}
                        title={archived ? "Restore" : "Archive"}
                      >
                        {archived ? <ArchiveRestore size={15} /> : <Archive size={15} />}
                      </button>
                      <button
                        onClick={() => {
                          setError(null);
                          setConfirming(m);
                        }}
                        className="text-ink-faint transition-colors hover:text-rose"
                        aria-label={`Delete ${m.name}`}
                        title="Delete permanently"
                      >
                        <Trash2 size={15} />
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {confirming && (
        <DeleteModule
          module={confirming}
          busy={remove.isPending}
          onCancel={() => setConfirming(null)}
          onConfirm={() => remove.mutate(confirming.id)}
        />
      )}
    </div>
  );
}

/**
 * Deleting a module cascades to its lessons, their sections and media links, and every
 * entitlement to it. Nothing here is recoverable without a database restore, so the
 * dialog states what will go and asks for the module's name to be typed.
 */
function DeleteModule({
  module,
  busy,
  onCancel,
  onConfirm,
}: {
  module: ModuleRow;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [typed, setTyped] = useState("");
  const matches = typed.trim() === module.name;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ground-deep/80 px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-module-title"
    >
      <div className="w-full max-w-md rounded-sm border border-rule bg-panel p-7">
        <h2 id="delete-module-title" className="font-serif text-2xl text-ink">
          Delete {module.name}?
        </h2>
        <p className="mt-3 text-sm text-ink-soft">This permanently deletes:</p>
        <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-soft">
          <li>
            · <span className="tabular-nums text-ink">{module.lesson_count}</span> lessons and all
            their content
          </li>
          <li>
            · access for{" "}
            <span className="tabular-nums text-ink">{module.members_holding}</span>{" "}
            {module.members_holding === 1 ? "member" : "members"}
          </li>
        </ul>
        <p className="mt-3 text-sm text-ink-soft">
          It cannot be undone. To hide the module instead and keep everything, cancel and archive
          it.
        </p>

        <label className="mt-5 flex flex-col gap-1.5">
          <span className="text-xs text-ink-faint">
            Type <span className="text-ink">{module.name}</span> to confirm
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
            {busy ? "Deleting…" : "Delete permanently"}
          </button>
        </div>
      </div>
    </div>
  );
}
