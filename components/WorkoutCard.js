import Image from "next/image";
import Link from "next/link";
import StatsRow from "./StatsRow";

export default function WorkoutCard({ workout }) {
  const { id, name, image, muscleGroups = [], equipment, duration, caloriesBurned, rating } = workout;

  return (
    <Link
      href={`/workout/${id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border-soft bg-surface transition-all hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-surface-2">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-base font-bold uppercase leading-snug tracking-wide">
          {name}
        </h3>

        <p className="text-xs text-muted">{equipment}</p>

        <StatsRow
          duration={duration}
          caloriesBurned={caloriesBurned}
          rating={rating}
          className="mt-auto pt-1"
        />
      </div>
    </Link>
  );
}
