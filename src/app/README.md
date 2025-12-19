App layer (FSD)
- Keep `app` specific helpers scoped (use `src/app/*`).
- The `app` layer is the application entrypoint — keep it thin and declarative.
Notes

- `src/app/[locale]/layout.tsx` composes i18n + auth provider and renders the page children.
Example

- Enforce import boundaries with ESLint (see `eslint-plugin-boundaries`).
- Add integration/smoke tests for routing and provider wiring.
Testing & linting
- Prefer minimal surface: avoid re-exporting wide internals.
Public API rules

- Must NOT import from lower-level pages/processes that are intended to depend on the app.
- May import from: `entities`, `features`, `shared`, `widgets`, `screens`.
Allowed imports

- Keep only application-level orchestration; delegate domain logic to `entities` and `features`.
- Compose pages/screens and high-level routes.
- Configure global providers (i18n, auth, theme, QueryProvider, etc.).
Responsibilities

- Top-level application composition (routing, global providers, layout). In Next.js this maps to the `app/` router.
Purpose


