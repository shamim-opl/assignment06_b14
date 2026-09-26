"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Dumbbell, Search } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";
import { LibrarySkeleton } from "@/components/Loader";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    getWorkouts()
      .then((data) => {
        if (cancelled) return;
        setWorkouts(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleWorkouts = useMemo(() => {
    const filtered = workouts.filter((w) => {
      const haystack = `${w.name} ${(w.muscleGroups || []).join(" ")}`.toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    });
    return [...filtered].sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0));
  }, [workouts, sortBy, query]);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-4 py-14 sm:px-6 md:flex-row md:py-20">
        <div className="flex-1 text-center md:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Workout Library
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide sm:text-5xl lg:text-6xl">
            Train With Intent.
            <br />
            Log Every Set.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm text-muted md:mx-0">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&rsquo;s plan, and watch the week&rsquo;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground transition-transform hover:scale-105"
          >
            <Dumbbell size={18} />
            Browse Workouts
          </a>
        </div>

        <div className="relative aspect-square w-56 flex-shrink-0 sm:w-72 md:w-96">
          <Image
            src="/banner.png"
            alt="Anatomy illustration on a gym machine"
            fill
            priority
            className="object-contain"
          />
        </div>
      </section>

      {/* Library */}
      <section id="library" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-20 sm:px-6">
        <div className="flex flex-col gap-4 border-b border-border-soft pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">
              The Library
            </h2>
            <p className="mt-1 text-sm text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search workouts"
                className="w-40 rounded-lg border border-border-soft bg-surface py-2 pl-8 pr-3 text-xs text-foreground outline-none focus:border-accent sm:w-56"
              />
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        <div className="mt-8">
          {status === "loading" && <LibrarySkeleton />}

          {status === "error" && (
            <p className="py-16 text-center text-sm text-muted">
              Couldn&rsquo;t load the workout library. Please refresh the page.
            </p>
          )}

          {status === "ready" && visibleWorkouts.length === 0 && (
            <p className="py-16 text-center text-sm text-muted">
              No workouts match &ldquo;{query}&rdquo;.
            </p>
          )}

          {status === "ready" && visibleWorkouts.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {visibleWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
