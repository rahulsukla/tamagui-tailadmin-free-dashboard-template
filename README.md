# Tamagui TailAdmin Free Dashboard Template

Universal (iOS / Android / Web) admin dashboard template. Visual design and free page inventory are ported from the [TailAdmin free MIT edition](https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template); UI is built with [Tamagui](https://github.com/tamagui/tamagui).

> Independent community port — not affiliated with TailAdmin or Tamagui commercial products. See [NOTICE](./NOTICE).

## Live demo

**[https://rahulsukla.github.io/tamagui-tailadmin-free-dashboard-template/](https://rahulsukla.github.io/tamagui-tailadmin-free-dashboard-template/)**

The demo is a static Expo web export hosted on GitHub Pages (`gh-pages` branch). It redeploys automatically on every push to `main` and when a GitHub Release is published (see [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml)).

## Stack

- Expo SDK 57 + Expo Router
- Tamagui 2 (OSS UI kit + themes)
- Outfit font (TailAdmin default)
- Light / dark / system theme with persistence
- Configurable brand preset, density, sticky header, content width (header ⚙ panel)

## Scripts

```bash
npm install
npm run web              # web (dev)
npm run ios              # iOS simulator
npm run android          # Android emulator
npm start                # Expo CLI
npm run typecheck
npm run export:web       # static export → dist/
npm run export:web:pages # static export with GitHub Pages base path
npm run serve:web        # serve dist/ locally
```

Clear Metro cache if styles look stale: `npx expo start -c`

## CI / demo hosting

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `CI` | PR + push to `main` | `npm ci` + typecheck |
| `Deploy GitHub Pages` | push to `main`, published release, or manual | Export web with `baseUrl` and publish `dist/` to `gh-pages` |

One-time repo setup (already scripted where possible):

1. Settings → Pages → **Deploy from a branch** → Branch: `gh-pages` / `/` (root)
2. Optional: set repository Homepage to the demo URL above

## Phase status

| Phase | Status |
|-------|--------|
| 0 Scaffold + MIT/NOTICE + tokens | Done |
| 1 Shell (sidebar, header, theme, routes) | Done |
| 2 UI kit pages: buttons, alerts, badges, avatars, images, videos | Done |
| 3 Forms + basic tables | Done |
| 4 Ecommerce dashboard widgets + charts | Done |
| 5 Profile / calendar / auth polish | Done |
| 6 Config panel + polish + Pages demo/CI | Done |

## Licensing

- This repo: MIT
- Upstream TailAdmin free: MIT (attribution in NOTICE)
- Tamagui OSS: MIT
- Do **not** copy TailAdmin Pro or Tamagui Bento/Takeout Pro assets
