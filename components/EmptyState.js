import Link from "next/link";

export default function EmptyState({
  title = "NOTHING HERE YET",
  text = "Browse the library and add a lift to get today moving.",
  ctaLabel = "Go to workouts",
  ctaHref = "/",
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border-soft bg-surface px-6 py-16 text-center">
      <h3 className="font-display text-xl font-bold uppercase tracking-wide">
        {title}
      </h3>
      <p className="max-w-sm text-sm text-muted">{text}</p>
      <Link
        href={ctaHref}
        className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground transition-transform hover:scale-105"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
