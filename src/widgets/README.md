Widgets layer (FSD)

Purpose
- Reusable, self-contained UI blocks combining visual and functional parts. Widgets are higher-level than `shared/ui` primitives and can depend on `features` for behavior.

Responsibilities
- Provide self-contained components that can be placed inside screens and pages.
- May include small internal state, composition of `shared/ui` primitives, and feature hooks.

Allowed imports
- May import from: `shared` (including `shared/ui`), `features`, and `entities` if necessary.
- Must NOT import from: `screens` or `app`.

Public API rules
- Each widget should have a clear public contract via its `index.ts` (props and exported subcomponents).

Testing & linting
- Unit tests covering visual output and behavior; snapshot tests when helpful.

Example
- `src/widgets/user-card` composes `shared/ui` primitives and a `useUser` feature hook to render a user preview.

Notes
- Widgets are intended to be reused across screens; keep their dependencies minimal.
