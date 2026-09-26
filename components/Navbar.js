"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { usePlan } from "@/context/PlanContext";
import { useBump } from "@/lib/useBump";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount, hydrated } = usePlan();
  const planBumping = useBump(planCount, { enabled: hydrated });
  const savedBumping = useBump(savedCount, { enabled: hydrated });

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

        <div
          className={`flex items-center gap-2 transition-opacity duration-300 ${
            hydrated ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            href="/my-plan?tab=plan"
            aria-label={`Plan: ${planCount} workouts`}
            className={`rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground transition-transform hover:scale-105 active:scale-95 ${
              planBumping ? "animate-bump" : ""
            }`}
          >
            Plan {planCount}
          </Link>
          <Link
            href="/my-plan?tab=saved"
            aria-label={`Saved: ${savedCount} workouts`}
            className={`rounded-full border border-border-soft px-3 py-1 text-xs font-bold text-foreground transition-colors hover:border-accent hover:text-accent active:scale-95 ${
              savedBumping ? "animate-bump" : ""
            }`}
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
                className={`text-xs font-semibold uppercase tracking-wide transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-foreground"
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
