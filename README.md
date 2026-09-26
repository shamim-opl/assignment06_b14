<p align="center">
  <img src="assets/banner.png" alt="FitLog" width="180" />
</p>

<h1 align="center">FitLog — Workout Library</h1>

<p align="center">
  A dark, no-nonsense gym companion. Pick a lift, lock it into today's plan,
  and watch the week's work add up.
</p>

<p align="center">
  <a href="https://myfitlog-gym.vercel.app"><strong>🔗 Live Demo</strong></a>
  ·
  <a href="https://www.figma.com/design/v7f5IwCopO8QnlColml6zs/Existing-App-Screenshots?node-id=602-1768">Figma Design</a>
</p>

---

## Description

FitLog is a workout-library web app built with Next.js. It pulls twelve
workouts from a live API, lets you dig into any lift's full instructions and
stats, and helps you build a daily training plan — capped at five lifts a
day — or save workouts for later. Everything you add is stored in
`localStorage`, so your plan and saved list survive a page reload.

Built for **Batch 14, Assignment 06**.

## Technologies Used

| Category   | Tech                                                             |
| ---------- | ----------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router)                     |
| UI         | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com) |
| Icons      | [lucide-react](https://lucide.dev)                                 |
| Feedback   | [react-hot-toast](https://react-hot-toast.com)                     |
| Data       | [FitLog API](https://api.abcz.workers.dev/api/fitlog)             |
| Deployment | [Vercel](https://vercel.com)                                       |

## Features

1. **Responsive workout library** — a 3×4 card grid on desktop that collapses
   to a single column on mobile, each card showing the workout image,
   muscle-group tags, equipment, and a duration / calories / rating stat row.
2. **Search & sort** — filter the library by name or muscle group in real
   time, and re-sort it by Duration, Calories, or Rating; a "Load more"
   button paginates the results.
3. **Workout detail pages** — a two-column layout with the full workout
   image, a key-specs panel (equipment, difficulty, sets, reps, duration,
   calories, rating), numbered instructions, and CTAs to add the lift to
   today's plan or save it for later.
4. **My Plan dashboard** — a live Exercises / Minutes / Calories summary,
   "Today's Plan" and "Saved" tabs (deep-linked from the navbar badges), and
   a five-lift daily cap that disables the "Add" button once it's reached.
5. **Per-item plan actions** — View Details, Mark as Done (with a visual
   "done" state), and Remove, each with its own toast confirmation.
6. **Toast-driven feedback** — every add, remove, save, and done action
   surfaces a toast, and the navbar's Plan / Saved badges update — and
   briefly "pop" — instantly.
7. **Persisted state** — the plan and saved lists live in `localStorage`, so
   reloading or closing the browser never loses your progress.
8. **Loading, empty, and error states** — skeleton cards while the library
   fetches, a friendly "Nothing here yet" empty state on My Plan, and a
   custom 404 page for unknown routes or workout IDs.
9. **Smooth micro-interactions** — smooth-scroll to the library, fade-in
   content, tactile press feedback on buttons, and full support for
   `prefers-reduced-motion`.
10. **Fully responsive** — reworked navbar, hero, grid, and CTAs across
    mobile, tablet, and desktop breakpoints.

## Pages

| Route            | Description                                             |
| ----------------- | -------------------------------------------------------- |
| `/`                | Hero + searchable, sortable workout library              |
| `/workout/[id]`    | Workout detail — specs, instructions, add/save CTAs      |
| `/my-plan`         | Today's Plan & Saved tabs, live metrics                  |
| `*` (unknown route)| Custom 404 page                                          |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## Project Structure

```
app/
  page.js                Home (hero + library)
  workout/[id]/page.js    Workout detail page
  my-plan/page.js         My Plan page (Today's Plan / Saved tabs)
  not-found.js            404 page
  layout.js               Root layout, fonts, providers
components/               Reusable UI (Navbar, Footer, cards, etc.)
context/PlanContext.js    Plan / Saved state, localStorage persistence
lib/api.js                FitLog API helpers
lib/useBump.js            Small "pop" animation hook for counters
```

## API

Workout data comes from a public FitLog API:

- All workouts: `GET https://api.abcz.workers.dev/api/fitlog`
- Single workout: `GET https://api.abcz.workers.dev/api/fitlog/:id`

---

<p align="center">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
