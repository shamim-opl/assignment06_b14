"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                    active
                      ? "text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            aria-label={`Plan: ${planCount} workouts`}
            className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground transition-transform hover:scale-105"
          >
            Plan {planCount}
          </Link>
          <Link
            href="/my-plan"
            aria-label={`Saved: ${savedCount} workouts`}
            className="rounded-full border border-border-soft px-3 py-1 text-xs font-bold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Saved {savedCount}
          </Link>
        </div>
      </nav>

      {/* mobile nav links */}
      <ul className="flex items-center justify-center gap-6 border-t border-border-soft py-2 sm:hidden">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-xs font-semibold uppercase tracking-wide ${
                  active ? "text-accent" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
