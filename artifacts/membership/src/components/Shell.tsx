import { Link } from "wouter";
import { LogOut, Users } from "lucide-react";
import { useAuth } from "@/context/Auth";
import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  const { member, signOut } = useAuth();
  const name = member?.first_name || member?.email?.split("@")[0] || "";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-aubergine text-porcelain">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
          <Link
            href="/"
            className="font-serif text-2xl leading-none tracking-tight text-porcelain no-underline"
          >
            A New You
          </Link>
          <div className="flex items-center gap-5 text-sm">
            {name && <span className="hidden text-plum sm:inline">Hello, {name}</span>}
            {member?.is_admin && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-champagne-bright no-underline hover:text-porcelain"
              >
                <Users size={15} aria-hidden="true" />
                Members
              </Link>
            )}
            <button
              onClick={() => void signOut()}
              className="flex items-center gap-1.5 text-champagne-bright hover:text-porcelain"
            >
              <LogOut size={15} aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">{children}</main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-6 text-xs text-mute">
          A New You — member area. Your material is private to your account.
        </div>
      </footer>
    </div>
  );
}
