export function CardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border-soft bg-surface">
      <div className="aspect-square w-full animate-pulse bg-surface-2" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-surface-2" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-surface-2" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-surface-2" />
      </div>
    </div>
  );
}

export function LibrarySkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function Spinner({ label = "Loading workouts…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-border-soft border-t-accent" />
      <p className="text-sm font-semibold uppercase tracking-wide">{label}</p>
    </div>
  );
}
