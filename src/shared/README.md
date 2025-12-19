Shared layer (FSD)

Purpose
- Low-level utilities, UI primitives, and configuration shared across the app. This is a place for small, well-encapsulated building blocks used by `entities`, `features`, `widgets`, and `app`.

Responsibilities
- Provide pure helpers (`lib`), constants, hooks, and UI primitives (`shared/ui/visual` and `shared/ui/functional`).
- Host environment configuration (`shared/config`) and small integration adapters.

Allowed imports
- May import only from other `shared` modules or lower-level platform libs. Higher layers import from `shared`, not the other way around.

Public API rules
- Keep the public surface of `shared` small and stable. Avoid turning `shared` into a dumping ground for unrelated code.
- Mark internal-only files with underscore prefix and avoid re-exporting them from the `shared` barrel.

Testing & linting
- Unit tests for hooks and helper functions; visual regression tests for UI primitives.
- Use ESLint rules to prevent `shared` from depending on higher layers.

Example
- `src/shared/ui/visual/_Button.tsx` is a primitive visual component; `shared/ui/index.ts` re-exports stable primitives.

Notes
- Be strict about responsibilities: `shared` is for true cross-cutting concerns only.
