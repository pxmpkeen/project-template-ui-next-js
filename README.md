# Project Template

This is a Next.js template project written by [Javid Jalilov](https://github.com/pxmpkeen).

It comes with a full setup and example wiring for:

- next-intl (i18n)
- FSD (Feature-Sliced Design) architecture
- @tanstack/react-query (TanStack Query) for data fetching and caching
- zustand for lightweight state management
- Tailwind CSS for utility-first styling
- shadcn/ui components
- Full fetching logic integrated with React Query and Next.js
- Full authentication flow with jwt-based auth

Use this template as a starting point for multi-lingual, data-driven Next.js apps with modern state and UI tooling.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing pages under the `app/` directory; the app will auto-refresh as you edit.

## Project highlights

- Internationalization: `next-intl` is configured and used across routing and requests.
- Data fetching: `@tanstack/react-query` is set up with example fetchers and hooks; caching, invalidation and background refetching patterns are included.
- State management: `zustand` provides a simple, typed global store for UI state.
- Styling: Tailwind CSS is fully integrated, including `postcss` and base utilities.
- Components: shadcn/ui components are included for rapid UI composition.

## Learn more

Refer to each library's docs for deeper customization:

- Next.js docs: https://nextjs.org/docs
- next-intl: https://next-intl.org
- TanStack Query: https://tanstack.com/query
- zustand: https://github.com/pmndrs/zustand
- Tailwind CSS: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com

## Deploy

Deploy as a typical Next.js app (Vercel is recommended): see https://nextjs.org/docs/deployment
