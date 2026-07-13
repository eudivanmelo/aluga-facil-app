# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

There is no lint or test setup in this project yet.

- `npm start` — start the Expo dev server
- `npm run android` — build and run on Android (`expo run:android`)
- `npm run ios` — build and run on iOS (`expo run:ios`)
- `npm run web` — run in a browser (`expo start --web`)
- `npx tsc --noEmit` — type-check the project (`strict: true` in tsconfig.json)

## Architecture

**Routing.** File-based routing via `expo-router`, rooted at `src/app` (set in `app.json` under `plugins: expo-router.root`), not the default `app/` at repo root. `src/app/_layout.tsx` is the root layout: it wraps everything in `QueryClientProvider` (`@tanstack/react-query`) and `SafeAreaProvider`, and declares the top-level `Stack` (`(tabs)`, `auth`, `property/[id]`, `my-area/new-property`). Route groups:
- `(tabs)` — main tab screens (`index`, `map`, `my-area`), tab chrome hidden (`tabBarStyle: { display: 'none' }`) in favor of the custom `AppTabBar` organism rendered alongside `<Tabs>`.
- `auth/` — its own `_layout.tsx` stack (login, register, forgot-password flows).
- `my-area/new-property/` — a nested wizard stack (`step-1`, `step-2`, `step-3`) with its own `_layout.tsx`.

**No backend wired up yet.** `axios` and `@tanstack/react-query` are installed and `QueryClient` is instantiated in the root layout, but nothing calls a real API. Data is mocked (e.g. `src/data/mapProperties.ts`), and auth is stubbed — `my-area/new-property/_layout.tsx` hardcodes `isAuthenticated: true` with a commented-out `useAuth` import. Expect to build the real data layer from scratch rather than extend an existing one.

**Component structure follows atomic design** under `src/components`: `atoms/` (Typography, Button, Input, Avatar, ...), `molecules/` (PropertyCard, MapCard, SearchInput, ...), `organisms/` (AppTabBar, PropertyMap, HomeHeader, ...). Each component is a folder with `index.tsx` + a colocated `styles.ts` (plain `StyleSheet.create`, no styling library). `organisms/AppTabBar` is a thin routing wrapper (reads the current route via `usePathname`, hardcodes `isAuthenticated: false`) around the presentational `organisms/TabBar`, which renders the actual floating bottom bar — `AppTabBar` is what screens use, `TabBar` is its internal implementation.

**Design tokens** live in `src/constants`: `colors.ts` exports `COLORS` (semantic color scales like `primary[500]`), `typography.ts` exports `TYPOGRAPHY` keyed by variant strings (`'heading/large'`, `'body/medium'`, ...) consumed through the `Typography` atom's `variant` prop rather than raw style objects.

**Path aliasing.** `@/*` maps to `src/*` (tsconfig `paths`). This only covers `src` — the top-level `assets/` directory (SVGs, images) is outside `src`, so those are imported with relative paths (e.g. `../../../../assets/trash.svg`) even in files that otherwise use `@/` imports. This mixed import style is expected, not a mistake to "fix".

**SVGs are React components.** `metro.config.js` wires `react-native-svg-transformer` and `app.d.ts` declares the `*.svg` module type, so `import Icon from '.../foo.svg'` gives a `React.FC<SvgProps>`, not a URI.

**Maps** use `@maplibre/maplibre-react-native`, encapsulated in the `PropertyMap` organism and `MapCard`/`MapMarker` molecules.

**Expo version note:** this project is on Expo SDK 56, which is newer than most training data. Consult the versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing Expo/React Native API code (see `AGENTS.md`).
