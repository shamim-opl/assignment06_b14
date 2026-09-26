"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, ListPlus } from "lucide-react";
import { getWorkout } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import StatsRow from "@/components/StatsRow";
import { Spinner } from "@/components/Loader";

const SPECS = [
  { key: "equipment", label: "Equipment" },
  { key: "difficulty", label: "Difficulty" },
  { key: "sets", label: "Sets" },
  { key: "reps", label: "Reps" },
  { key: "duration", label: "Duration", suffix: " min" },
  { key: "caloriesBurned", label: "Calories", suffix: " kcal" },
  { key: "rating", label: "Rating" },
];

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | not-found | error

  const { addToPlan, addToSaved, isInPlan, isSaved, planCount } = usePlan();

  useEffect(() => {
    let cancelled = false;
    getWorkout(id)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setStatus("not-found");
        } else {
          setWorkout(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") return <Spinner />;

  if (status === "not-found" || status === "error") {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide">
          Workout not found
        </h1>
        <p className="text-sm text-muted">
          That lift doesn&rsquo;t exist in the library (anymore).
        </p>
        <Link
          href="/"
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground"
        >
          Back to the library
        </Link>
      </div>
    );
  }

  const alreadyInPlan = isInPlan(workout.id);
  const planFull = planCount >= 5 && !alreadyInPlan;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left: media */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border-soft bg-surface">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right: details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide sm:text-4xl">
              {workout.name}
            </h1>
            <p className="mt-3 text-sm text-muted">{workout.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {(workout.muscleGroups || []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Key specs */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl border border-border-soft bg-surface p-5 sm:grid-cols-3">
            {SPECS.map(({ key, label, suffix = "" }) => (
              <div key={key}>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {workout[key]}
                  {suffix}
                </dd>
              </div>
            ))}
          </dl>

          {/* Instructions */}
          <div>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="mt-3 flex flex-col gap-3">
              {(workout.instructions || []).map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <StatsRow
            duration={workout.duration}
            caloriesBurned={workout.caloriesBurned}
            rating={workout.rating}
          />

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              disabled={planFull}
              onClick={() => addToPlan(workout)}
              title={planFull ? "Today's plan is full (5 lifts max)" : undefined}
              className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              <ListPlus size={18} />
              Add to today&rsquo;s plan
            </button>
            <button
              type="button"
              onClick={() => addToSaved(workout)}
              className="flex items-center gap-2 rounded-full border border-border-soft px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Bookmark size={18} className={isSaved(workout.id) ? "fill-accent text-accent" : ""} />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
