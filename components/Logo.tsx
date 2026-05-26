import Link from "next/link";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? "h-6 w-6" : size === "lg" ? "h-8 w-8" : "h-7 w-7";
  const text = size === "sm" ? "text-sm" : size === "lg" ? "text-base" : "text-sm";

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 font-semibold tracking-tight text-foreground"
    >
      <span
        className={`inline-flex ${dim} items-center justify-center rounded border border-border bg-surface-elevated`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5 text-foreground"
          aria-hidden
        >
          <path d="M3 18h18" />
          <path d="M5 18a7 7 0 0 1 14 0" />
          <path d="M12 5v6" />
          <path d="M9 11h6" />
        </svg>
      </span>
      <span className={`${text} font-semibold tracking-tight`}>Chatbot BTP</span>
    </Link>
  );
}
