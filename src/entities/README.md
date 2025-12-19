Entities layer (FSD)

Purpose
- Hold domain models, business rules and plain data structures. Entities are the source of truth for domain concepts.

Responsibilities
- Define domain types, validation logic, pure functions and model adapters (DTO <-> domain).
- Encapsulate domain-specific logic and invariants; no UI code here.

Allowed imports
- May import from: `shared` (pure utilities), other `entities` (if modeling relationships), low-level libs.
- Must NOT import from: `features`, `widgets`, `screens`, or `app` (higher layers).

Public API rules
- Expose a small, explicit public API via `index.ts` barrels. Prefer explicit named exports and `export type` for types.
- Keep underscore-prefixed files (e.g., `_types.ts`) internal unless intentionally exported.

Testing & linting
- Unit tests focused on pure functions and invariants.
- Enforce no cross-layer imports from higher layers via ESLint rules.

Example
- `src/entities/user/model` contains `types`, `createUser`, `serialize/deserialize` helpers.

Notes
- Entities should be framework-agnostic to make them reusable across apps.
