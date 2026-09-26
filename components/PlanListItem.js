"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Circle, X } from "lucide-react";
import StatsRow from "./StatsRow";
import { usePlan } from "@/context/PlanContext";

export default function PlanListItem({ workout, variant }) {
  const { toggleDone, removeFromPlan, removeFromSaved } = usePlan();
  const isPlan = variant === "plan";

  return (
    <li
      className={`flex flex-col gap-4 rounded-xl border border-border-soft bg-surface p-4 sm:flex-row sm:items-center ${
        isPlan && workout.done ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-2">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" sizes="80px" />
      </div>

      <div className="flex-1">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide">
          {workout.name}
          {isPlan && workout.done && (
            <span className="ml-2 text-[10px] font-semibold uppercase text-accent">
              Done
            </span>
          )}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <StatsRow
          duration={workout.duration}
          caloriesBurned={workout.caloriesBurned}
          rating={workout.rating}
          className="mt-2"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-border-soft px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          View Details
        </Link>

        {isPlan && (
          <button
            type="button"
            onClick={() => toggleDone(workout.id)}
            className="flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-foreground transition-colors hover:text-accent"
          >
            {workout.done ? <CheckCircle2 size={14} className="text-accent" /> : <Circle size={14} />}
            Mark as Done
          </button>
        )}

        <button
          type="button"
          onClick={() => (isPlan ? removeFromPlan(workout.id) : removeFromSaved(workout.id))}
          aria-label="Remove"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border-soft text-muted transition-colors hover:border-red-400 hover:text-red-400"
        >
          <X size={14} />
        </button>
      </div>
    </li>
  );
}
