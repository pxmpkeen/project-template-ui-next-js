Features layer (FSD)

Purpose
- Implement application features: combinations of domain logic + UI orchestration for a single capability (e.g., user-auth UI flows, profile editing).

Responsibilities
- Compose `entities` and `shared` primitives to implement feature behaviors.
- Provide feature-specific hooks, components, and small controllers.

Allowed imports
- May import from: `entities`, `shared`, and other lower-level features if needed.
- Must NOT import from: `widgets` (UI primitives may be used, but prefer importing `shared/ui`), `screens`/`app` (higher layers).

Public API rules
- Each feature should expose a minimal public API from its `index.ts` (e.g., hooks/components it intends to be used by screens/widgets).

Testing & linting
- Unit tests for feature logic and integration tests verifying composition with `entities`.

Example
- `src/features/auth` could export `useLogin` hook and `AuthForm` component composition.

Notes
- Keep features focused; they are glue between entities and UI.
