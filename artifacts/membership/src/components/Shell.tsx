import { Link } from "wouter";
import { Layers, LogOut, Users } from "lucide-react";
import { useAuth } from "@/context/Auth";
import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  const { member, signOut } = useAuth();
  const name = member?.first_name || member?.email?.split("@")[0] || "";

  return (
    <div className="flex min-h-screen flex-col bg-ground">
      <header className="border-b border-rule-soft bg-ground-deep">
        <div className="mx-auto flex max-w-[75rem] items-center justify-between gap-4 px-6 py-5">
          <Link
            href="/"
            className="font-serif text-[1.75rem] leading-none tracking-tight text-ink no-underline"
          >
            A New You
          </Link>
          <div className="flex items-center gap-6 text-sm">
            {name && (
              <span className="hidden text-ink-faint sm:inline">
                Hello, <span className="text-ink-soft">{name}</span>
              </span>
            )}
            {member?.is_admin && (
              <>
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 text-gold no-underline transition-colors hover:text-gold-bright"
                >
                  <Users size={15} aria-hidden="true" />
                  Members
                </Link>
                <Link
                  href="/admin/modules"
                  className="flex items-center gap-1.5 text-gold no-underline transition-colors hover:text-gold-bright"
                >
                  <Layers size={15} aria-hidden="true" />
                  Modules
                </Link>
              </>
            )}
            <button
              onClick={() => void signOut()}
              className="flex items-center gap-1.5 text-ink-faint transition-colors hover:text-ink"
            >
              <LogOut size={15} aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[75rem] flex-1 px-6 py-12">{children}</main>

      <footer className="border-t border-rule-soft">
        <div className="mx-auto max-w-[75rem] px-6 py-7 text-xs text-ink-faint">
          A New You — member area. Your material is private to your account.
        </div>
      </footer>
    </div>
  );
}
