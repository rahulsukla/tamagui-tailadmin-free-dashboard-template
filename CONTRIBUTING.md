# Contributing

Thanks for helping improve this template.

## Prerequisites

- Node 22+
- Read Expo SDK **57** docs before changing Expo APIs: https://docs.expo.dev/versions/v57.0.0/

## Scripts

```bash
npm install
npm run web          # Expo web (dev)
npm run typecheck
npm run export:web   # static export → dist/
npm run export:web:pages  # export with GitHub Pages baseUrl
```

## Scope rules

- Port only **TailAdmin free** (MIT) inventory and patterns
- Do **not** copy TailAdmin Pro or Tamagui Bento / Takeout Pro assets
- Prefer lean cross-platform UI (`react-native-svg`, Expo Router) over web-only heavy libs
- Keep attribution in `LICENSE` and `NOTICE`

## Tree-shake / deps

Intentionally **not** included (use adapters instead):

- ApexCharts
- FullCalendar
- jsVectorMap

Bundle stays Expo + Tamagui + `react-native-svg` (+ Expo modules already in `package.json`).

## Pull requests

1. Run `npm run typecheck`
2. Prefer small, focused PRs
3. Update `CHANGELOG.md` for user-facing changes
