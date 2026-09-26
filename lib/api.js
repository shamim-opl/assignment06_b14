const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

/**
 * Fetch every workout in the library.
 * Throws on network / non-2xx errors so callers can show an error state.
 */
export async function getWorkouts() {
  const res = await fetch(API_BASE, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load workouts (${res.status})`);
  }
  return res.json();
}

/**
 * Fetch a single workout by id.
 * Returns null when the workout doesn't exist (404) so pages can render
 * their own "not found" UI instead of crashing.
 */
export async function getWorkout(id) {
  const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to load workout ${id} (${res.status})`);
  }
  return res.json();
}
