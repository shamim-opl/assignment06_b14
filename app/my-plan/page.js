"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePlan, PLAN_CAP } from "@/context/PlanContext";
import PlanListItem from "@/components/PlanListItem";
import EmptyState from "@/components/EmptyState";
import { Spinner } from "@/components/Loader";
import { useBump } from "@/lib/useBump";

const TABS = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

export default function MyPlanPage() {
  return (
    <Suspense fallback={<Spinner label="Loading workouts…" />}>
      <MyPlanContent />
    </Suspense>
  );
}

function MyPlanContent() {
  const { plan, saved, metrics, hydrated } = usePlan();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") === "saved" ? "saved" : "plan";
  const [activeTab, setActiveTab] = useState(tabParam);

  // The navbar's Plan/Saved badges link here with ?tab=plan / ?tab=saved.
  // Since this is the same route, Next.js doesn't remount the page on a
  // search-param-only navigation, so re-sync the active tab when it changes
  // (adjusting state during render, per React docs, instead of an effect).
  const [prevTabParam, setPrevTabParam] = useState(tabParam);
  if (tabParam !== prevTabParam) {
    setPrevTabParam(tabParam);
    setActiveTab(tabParam);
  }

  const list = activeTab === "plan" ? plan : saved;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div
        className={`mt-8 grid grid-cols-3 divide-x divide-border-soft overflow-hidden rounded-xl border border-border-soft bg-surface transition-opacity duration-300 ${
          hydrated ? "opacity-100" : "opacity-0"
        }`}
      >
        <MetricCard label="Exercises" value={metrics.exercises} hydrated={hydrated} />
        <MetricCard label="Minutes" value={metrics.minutes} hydrated={hydrated} />
        <MetricCard label="Calories" value={metrics.calories} hydrated={hydrated} />
      </div>

      {/* Tabs */}
      <div className="mt-8 flex items-center gap-2 border-b border-border-soft pb-4">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all active:scale-95 ${
              activeTab === tab.key
                ? "bg-accent text-accent-foreground"
                : "bg-surface-2 text-muted hover:text-foreground"
            }`}
          >
            {tab.label} ({tab.key === "plan" ? plan.length : saved.length})
          </button>
        ))}
        {activeTab === "plan" && (
          <span className="ml-auto text-xs text-muted">
            {plan.length}/{PLAN_CAP} lifts
          </span>
        )}
      </div>

      {/* List */}
      <div className="mt-6">
        {!hydrated && <Spinner label="Loading workouts…" />}

        {hydrated && list.length === 0 && (
          <EmptyState
            title="NOTHING HERE YET"
            text="Browse the library and add a lift to get today moving."
            ctaLabel="Go to workouts"
            ctaHref="/"
          />
        )}

        {hydrated && list.length > 0 && (
          <ul className="flex flex-col gap-3">
            {list.map((workout) => (
              <PlanListItem key={workout.id} workout={workout} variant={activeTab} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function MetricCard({ label, value, hydrated }) {
  const bumping = useBump(value, { enabled: hydrated });
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-5 text-center">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
        {label}
      </span>
      <span
        className={`font-display text-2xl font-bold text-foreground transition-colors ${
          bumping ? "animate-bump text-accent" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
