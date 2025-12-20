Screens layer (FSD) — pages

Purpose
- The Screens layer maps to FSD's Pages layer: top-level pages (routes) of the application. In this project `src/screens` is used as `pages`.

Responsibilities
- Implement page-level routing and data fetching for the route (server or client components per Next.js app router patterns).
- Compose `features`, `widgets`, and `entities` to render a full page.

Allowed imports
- May import from: `features`, `widgets`, `entities`, `shared`.
- Must NOT import from: `app` (the app composes screens), or other pages (screens should be independent).

Public API rules
- Screens are consumers, not libraries: avoid exporting internal APIs from screens.

Testing & linting
- Add page-level integration tests and route smoke tests.

Example
- `src/screens/dashboard/ui/Dashboard.tsx` imports a `DashboardFeature` from `src/features/dashboard` and arranges widgets.

Notes
- Remember: Screens == Pages in FSD terminology for this template.
