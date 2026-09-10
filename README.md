# Tamagui TailAdmin Free Dashboard Template

[![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-465fff?style=flat-square)](https://rahulsukla.github.io/tamagui-tailadmin-free-dashboard-template/)
[![Release](https://img.shields.io/badge/release-v0.1.0-0d9488?style=flat-square)](https://github.com/rahulsukla/tamagui-tailadmin-free-dashboard-template/releases/tag/v0.1.0)
[![License: MIT](https://img.shields.io/badge/license-MIT-gray?style=flat-square)](./LICENSE)

Universal (iOS / Android / Web) admin dashboard template. Visual design and free page inventory are ported from the [TailAdmin free MIT edition](https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template); UI is built with [Tamagui](https://github.com/tamagui/tamagui).

> Independent community port — not affiliated with TailAdmin or Tamagui commercial products. See [NOTICE](./NOTICE).

## Live demo

**[https://rahulsukla.github.io/tamagui-tailadmin-free-dashboard-template/](https://rahulsukla.github.io/tamagui-tailadmin-free-dashboard-template/)**

Current release: **v0.1.0**. The demo is a static Expo web export on GitHub Pages (`gh-pages`). It redeploys on every push to `main` and when a GitHub Release is published.

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

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [CHANGELOG.md](./CHANGELOG.md).

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
| 7 Release polish & v0.1.0 | Done |

## Licensing

- This repo: MIT
- Upstream TailAdmin free: MIT (attribution in NOTICE)
- Tamagui OSS: MIT
- Do **not** copy TailAdmin Pro or Tamagui Bento/Takeout Pro assets
