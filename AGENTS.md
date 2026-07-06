# AGENTS.md

Guidance for AI coding agents working in this repository.

## Commands

- `npm run dev` — start the dev server (SSR + HMR) at `http://localhost:5173`
- `npm run build` — production build (outputs `build/client/` and `build/server/`)
- `npm run start` — serve the production build with `@react-router/serve`
- `npm run typecheck` — regenerate route types (`react-router typegen`) then run `tsc`
- `npm test` — run unit tests once with Vitest (`vitest run`)

There is no lint script configured yet. Unit tests use Vitest + React Testing Library; config lives in `vitest.config.ts` and shared setup (e.g. jest-dom matchers) in `app/test/setup.ts`. Test files live alongside the code they cover (e.g. `app/routes/home.test.tsx`).

## Architecture

This is a React Router 8 **Framework Mode** app (SSR by default, see `ssr: true` in `react-router.config.ts`) using React 19, Vite, and Tailwind CSS 4.

- `app/routes.ts` — route config; maps URL paths to route modules (currently a single index route)
- `app/routes/` — route modules; each can export `loader`, `action`, `meta`, `links`, `ErrorBoundary`, etc., and gets generated types via `./+types/<route-name>`
- `app/root.tsx` — root layout (`<html>`/`<head>`/`<body>` shell via the `Layout` export), top-level `ErrorBoundary`, and global `links`
- `app/welcome/` — starter welcome page content, imported by the home route
- `~/*` path alias maps to `app/*` (see `tsconfig.json`)
- Route types are generated into `.react-router/types/` by `react-router typegen` (run automatically by `typecheck`, and by `dev`/`build`) — do not hand-edit generated types
- Docker deployment is set up (`Dockerfile`); build output layout is documented in `README.md`

## Implementing a GitHub issue

When asked to implement a GitHub issue, always:

- Fetch the issue first and read it in full before writing any code.
- Follow all acceptance criteria.
- If anything is ambiguous, ask rather than guess.
- Use a new branch for development, following the pattern `<issue-number>-<issue-title>`.

## React Router skill

A React Router skill lives at `.agents/skills/react-router/SKILL.md` with mode-specific references under `.agents/skills/react-router/references/`. This app is in **Framework Mode** — consult `references/framework-mode.md` for routing, loaders/actions, and SSR/SPA/pre-rendering questions. The skill also points to `node_modules/react-router/docs/` as the version-matched source of truth.
