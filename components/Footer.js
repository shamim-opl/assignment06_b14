import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-center sm:flex-row sm:px-6 sm:text-left">
        <div className="flex items-center gap-2 font-display text-base font-bold tracking-wide">
          <Image src="/logo.png" alt="FitLog logo" width={22} height={22} />
          FITLOG
        </div>
        <p className="text-xs text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
