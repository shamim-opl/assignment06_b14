# FitLog — Workout Library

A dark, no-nonsense gym companion built for Batch 14, Assignment 06. Pick a lift
from the library, lock it into today's plan, and watch the week's work add up.

**Live site:** _add your Vercel URL here after deploying_
**Figma design:** [Existing App Screenshots](https://www.figma.com/design/v7f5IwCopO8QnlColml6zs/Existing-App-Screenshots?node-id=602-1768)

## Description

FitLog lets you browse a library of twelve workouts pulled from a live API,
open any lift to see its full instructions and stats, and build a daily
training plan (capped at five lifts) or save workouts for later. Everything
you add persists across page reloads via `localStorage`, so your plan is
still there the next time you open the app.

## Technologies Used

- **Next.js 16** (App Router) — routing, layouts, and rendering
- **React 19**
- **Tailwind CSS 4** — styling and responsive layout
- **lucide-react** — icon set
- **react-hot-toast** — toast notifications
- **FitLog API** (`https://api.abcz.workers.dev/api/fitlog`) — workout data
- **Vercel** — deployment

## Features

1. **Responsive workout library** — a 3×4 card grid on desktop that collapses
   gracefully down to a single column on mobile, each card showing the
   workout image, muscle-group tags, equipment, and a duration / calories /
   rating stat row.
2. **Sort & search** — reorder the library by Duration, Calories, or Rating,
   and filter by workout name or muscle group in real time.
3. **Workout detail pages** — a two-column layout with the full workout
   image, key-specs panel, numbered instructions, and CTAs to add the lift
   to today's plan or save it for later.
4. **My Plan dashboard** — live Exercises / Minutes / Calories summary,
   "Today's Plan" and "Saved" tabs, a five-lift cap with a disabled add
   button once it's reached, and per-item actions (View Details, Mark as
   Done, Remove).
5. **Toast-driven feedback** — every add, remove, save, and done action
   surfaces a toast, and the navbar's Plan / Saved badges update instantly.
6. **Persisted state** — the plan and saved lists are stored in
   `localStorage`, so reloading (or closing) the browser doesn't lose your
   progress.
7. **Loading, empty, and 404 states** — skeleton cards while the library
   fetches, a friendly "Nothing here yet" empty state on My Plan, and a
   custom 404 page for unknown routes.

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
  page.js              Home (hero + library)
  workout/[id]/page.js Workout detail page
  my-plan/page.js       My Plan page (Today's Plan / Saved tabs)
  not-found.js          404 page
  layout.js             Root layout, fonts, providers
components/              Reusable UI pieces (Navbar, Footer, cards, etc.)
context/PlanContext.js   Plan / Saved state, localStorage persistence
lib/api.js               FitLog API helpers
```
