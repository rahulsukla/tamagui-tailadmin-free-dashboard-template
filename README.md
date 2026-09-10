# Verdant — Tamagui Admin Template

[![npm](https://img.shields.io/npm/v/verdant-tamagui-admin-template?style=flat-square&color=3d8b6e)](https://www.npmjs.com/package/verdant-tamagui-admin-template)
[![Demo](https://img.shields.io/badge/demo-live-3d8b6e?style=flat-square)](https://rahulsukla.github.io/verdant-tamagui-admin-template/)
[![CI](https://img.shields.io/github/actions/workflow/status/rahulsukla/verdant-tamagui-admin-template/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/rahulsukla/verdant-tamagui-admin-template/actions)
[![License: MIT](https://img.shields.io/badge/license-MIT-gray?style=flat-square)](./LICENSE)
[![Expo SDK](https://img.shields.io/badge/Expo-SDK%2057-000?style=flat-square)](https://docs.expo.dev/versions/v57.0.0/)

**Verdant** is a free, open-source admin dashboard template for **iOS, Android, and Web**.

Built with [Expo](https://expo.dev) SDK 57, [Expo Router](https://docs.expo.dev/router/introduction/), and [Tamagui](https://tamagui.dev).

**npm:** [`verdant-tamagui-admin-template`](https://www.npmjs.com/package/verdant-tamagui-admin-template)

<p align="center">
  <a href="https://www.npmjs.com/package/verdant-tamagui-admin-template"><strong>npm package →</strong></a>
  ·
  <a href="https://rahulsukla.github.io/verdant-tamagui-admin-template/"><strong>Live demo →</strong></a>
  ·
  <a href="./docs/components.md"><strong>Component docs →</strong></a>
  ·
  <a href="https://github.com/rahulsukla/verdant-tamagui-admin-template/releases"><strong>Releases →</strong></a>
</p>

---

## Why Verdant?

- **Universal** — one codebase for web + native (Expo Router)
- **Themeable** — light / dark / system, brand presets, density, sticky header
- **Lean charts** — SVG area/bar charts (no ApexCharts / FullCalendar / jsVectorMap)
- **Ready pages** — ecommerce dashboard, forms, tables, profile, calendar, auth, UI kit
- **MIT licensed** — fork it, ship it, customize it

> Inspired by free [TailAdmin](https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template) layout inventory and the [tweakcn Light Green](https://tweakcn.com/themes/cmlhfpjhw000004l4f4ax3m7z?p=dashboard) dashboard mood. Not affiliated with TailAdmin, tweakcn, or Tamagui commercial products. See [NOTICE](./NOTICE).

## Quick start

### Option A — Expo template from npm (recommended)

```bash
npx create-expo-app@latest my-admin --template verdant-tamagui-admin-template
cd my-admin
npm run web
```

Package on npm: https://www.npmjs.com/package/verdant-tamagui-admin-template

### Option B — Expo template from GitHub

```bash
npx create-expo-app@latest my-admin --template https://github.com/rahulsukla/verdant-tamagui-admin-template
cd my-admin
npm run web
```

### Option C — Clone from GitHub

```bash
git clone https://github.com/rahulsukla/verdant-tamagui-admin-template.git
cd verdant-tamagui-admin-template
npm install
npm run web
```

### Option D — Local tarball (offline / CI smoke)

```bash
npm pack
npx create-expo-app@latest my-admin --template ./verdant-tamagui-admin-template-*.tgz
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run web` | Start Expo web (dev) |
| `npm run ios` / `android` | Native simulators |
| `npm run typecheck` | TypeScript |
| `npm run audit:pages` | Nav ↔ routes + brand guard |
| `npm run export:web` | Static web export → `dist/` |
| `npm run smoke:template` | Pack + create app + typecheck smoke |

## Features

- Sidebar + header shell with notifications, user menu, config panel
- Ecommerce home (KPIs, sales charts, demographics, recent orders)
- Forms, tables, documents checklist, progress bars
- Profile cards with edit modals, calendar board
- UI kit: alerts, avatars, badges, buttons, images, videos
- Sign in / sign up + 404
- Outfit font, verdant green default brand

## Project structure

```
app/                 Expo Router screens
components/          UI kit, forms, charts, ecommerce, profile
layout/              App shell (sidebar, header)
context/             Theme + template config
navigation/          Sidebar nav model
theme/               Colors + brand presets
docs/components.md   Usage guide
```

## Using components

Path alias `@/*` maps to the project root (`tsconfig.json`).

```tsx
import { AppButton } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useTemplateConfig } from '@/context/TemplateConfigContext'

export function Example() {
  const { brandColor } = useTemplateConfig()
  return (
    <>
      <AppButton variant="primary">Save</AppButton>
      <ProgressBar label="Onboarding" value={72} />
    </>
  )
}
```

Full guide: [docs/components.md](./docs/components.md)

## Requirements

- Node 22+
- Expo SDK **57** — https://docs.expo.dev/versions/v57.0.0/

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Issues and PRs welcome.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT](./LICENSE) © contributors

Third-party inspiration notes: [NOTICE](./NOTICE)
