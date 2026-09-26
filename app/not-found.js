import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-28 text-center">
      <p className="font-display text-7xl font-bold text-accent">404</p>
      <h1 className="font-display text-2xl font-bold uppercase tracking-wide">
        Page not found
      </h1>
      <p className="max-w-sm text-sm text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground transition-transform hover:scale-105 active:scale-95"
      >
        Back to the library
      </Link>
    </div>
  );
}
