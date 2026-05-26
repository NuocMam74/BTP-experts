import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-background/60">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs text-muted-foreground">
        <div>
          © {new Date().getFullYear()} Chatbot BTP — Les agents préparent des
          analyses ; la responsabilité professionnelle reste à l’utilisateur.
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/" className="hover:text-foreground">
            Agents
          </Link>
          <Link href="/chat" className="hover:text-foreground">
            Conversations
          </Link>
          <Link href="/billing" className="hover:text-foreground">
            Abonnements
          </Link>
        </nav>
      </div>
    </footer>
  );
}
