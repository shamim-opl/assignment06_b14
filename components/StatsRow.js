import { Clock, Flame, Star } from "lucide-react";

export default function StatsRow({ duration, caloriesBurned, rating, className = "" }) {
  return (
    <div className={`flex items-center gap-4 text-xs text-muted ${className}`}>
      <span className="flex items-center gap-1">
        <Clock size={14} className="text-accent" />
        {duration} min
      </span>
      <span className="flex items-center gap-1">
        <Flame size={14} className="text-accent" />
        {caloriesBurned} kcal
      </span>
      <span className="flex items-center gap-1">
        <Star size={14} className="text-accent" />
        {rating}
      </span>
    </div>
  );
}
