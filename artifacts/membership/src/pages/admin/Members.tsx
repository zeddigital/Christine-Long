import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { UserPlus, ShieldCheck } from "lucide-react";
import { fetchMembers } from "@/lib/admin";
import { Empty, Spinner } from "@/components/Bits";

function when(iso: string | null) {
  if (!iso) return "—";
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

const STATUS: Record<string, string> = {
  active: "bg-[#e2ebe0] text-[#4a6b50]",
  invited: "bg-[#f6efdf] text-champagne",
  inactive: "bg-subtle text-mute",
};

export default function AdminMembers() {
  const q = useQuery({ queryKey: ["admin-members"], queryFn: fetchMembers });

  if (q.isLoading) return <Spinner label="Loading members" />;
  if (q.error) return <Empty title="Couldn't load members" detail={String(q.error)} />;

  const rows = q.data ?? [];
  const withAccess = rows.filter((r) => r.modules_held > 0);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl leading-none text-aubergine">Members</h1>
          <p className="mt-3 text-plum">
            {withAccess.length} with access · {rows.length - withAccess.length} dormant
          </p>
        </div>
        <Link
          href="/admin/invite"
          className="flex items-center gap-2 rounded-sm bg-aubergine px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-porcelain no-underline"
        >
          <UserPlus size={14} aria-hidden="true" /> Add a member
        </Link>
      </div>

      <div className="overflow-x-auto rounded-sm border border-line bg-surface">
        <table className="w-full min-w-[46rem] text-sm">
          <thead>
            <tr className="border-b border-line bg-subtle text-left">
              {["Member", "Status", "Modules", "Completed", "Last active"].map((h, i) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-mute ${
                    i > 1 ? "text-right" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id} className="border-b border-line last:border-0 hover:bg-subtle">
                <td className="px-4 py-3">
                  <Link href={`/admin/members/${m.id}`} className="text-aubergine no-underline">
                    <span className="flex items-center gap-2">
                      {[m.first_name, m.last_name].filter(Boolean).join(" ") || m.email}
                      {m.is_admin && (
                        <ShieldCheck size={13} className="text-champagne" aria-label="Admin" />
                      )}
                    </span>
                    <span className="block text-xs text-mute">{m.email}</span>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      STATUS[m.status] ?? STATUS.inactive
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{m.modules_held || "—"}</td>
                <td className="px-4 py-3 text-right tabular-nums">{m.lessons_completed || "—"}</td>
                <td className="px-4 py-3 text-right text-xs text-mute">{when(m.last_activity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
