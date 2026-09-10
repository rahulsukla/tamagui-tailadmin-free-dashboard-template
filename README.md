# Verdant — Universal Admin Template

[![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-3d8b6e?style=flat-square)](https://rahulsukla.github.io/tamagui-tailadmin-free-dashboard-template/)
[![Release](https://img.shields.io/badge/release-v0.2.0-0d9488?style=flat-square)](https://github.com/rahulsukla/tamagui-tailadmin-free-dashboard-template/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-gray?style=flat-square)](./LICENSE)

**Verdant** is a universal (iOS / Android / Web) admin dashboard template built with **Expo SDK 57**, **Expo Router**, and **Tamagui**.

> Inspired by the free [TailAdmin](https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template) layout inventory and the [tweakcn Light Green](https://tweakcn.com/themes/cmlhfpjhw000004l4f4ax3m7z?p=dashboard) dashboard mood. Independent project — not affiliated with TailAdmin, tweakcn, or Tamagui commercial products. See [NOTICE](./NOTICE).

## Live demo

**https://rahulsukla.github.io/tamagui-tailadmin-free-dashboard-template/**

Static Expo web export on GitHub Pages (`gh-pages`). Redeploys on push to `main` and on published releases.

## Stack

- Expo SDK 57 + Expo Router (web + native)
- Tamagui OSS UI + themes (Outfit font)
- Light / dark / system theme with persistence
- Config panel: brand presets (default **verdant** green), density, sticky header, content width
- Lean SVG charts and calendar (no ApexCharts / FullCalendar / jsVectorMap)

## Quick start

```bash
npm install
npm run web              # web (dev)
npm run ios              # iOS simulator
npm run android          # Android emulator
npm run typecheck
npm run audit:pages      # nav ↔ routes + UI brand check
npm run export:web       # static export → dist/
npm run export:web:pages # export with GitHub Pages base path
```

Component usage docs: [docs/components.md](./docs/components.md)  
Contributing: [CONTRIBUTING.md](./CONTRIBUTING.md)  
Changelog: [CHANGELOG.md](./CHANGELOG.md)

## Inspiration & licensing

| Source | License | How we use it |
|--------|---------|----------------|
| [TailAdmin free](https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template) | MIT | Page inventory / shell inspiration only — UI does not brand as TailAdmin |
| [tweakcn Light Green](https://tweakcn.com/themes/cmlhfpjhw000004l4f4ax3m7z?p=dashboard) ([repo](https://github.com/jnsahaj/tweakcn), Apache-2.0) | Apache-2.0 | Color mood, KPI card rhythm, documents table structure |
| [Tamagui](https://github.com/tamagui/tamagui) | MIT | UI primitives |

Do **not** copy TailAdmin Pro or Tamagui Bento/Takeout Pro assets into this repo.

## Routes (high level)

Dashboard, Calendar, Profile, Forms, Basic Tables, Documents, Blank, 404, Line/Bar charts, UI kit (alerts, avatars, badges, buttons, images, videos, progress), Sign In / Sign Up.

## CI / demo hosting

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `CI` | PR + push to `main` | typecheck + `audit:pages` |
| `Deploy GitHub Pages` | `main`, release, or manual | export web + publish `gh-pages` |
