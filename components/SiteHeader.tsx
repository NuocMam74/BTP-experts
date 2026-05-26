import Link from "next/link";

import { HeaderUserBadge } from "@/components/HeaderUserBadge";
import { LlmStatusBadge } from "@/components/LlmStatusBadge";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-1 text-[13px] md:flex">
            <Link
              href="/"
              className="rounded px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Agents
            </Link>
            <Link
              href="/chat"
              className="rounded px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Conversations
            </Link>
            <Link
              href="/billing"
              className="rounded px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Abonnements
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LlmStatusBadge compact />
          </div>
          <ThemeToggle />
          <HeaderUserBadge />
        </div>
      </div>
    </header>
  );
}
