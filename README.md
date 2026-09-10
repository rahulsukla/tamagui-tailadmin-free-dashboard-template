# Tamagui TailAdmin Free Dashboard Template

Universal (iOS / Android / Web) admin dashboard template. Visual design and free page inventory are ported from the [TailAdmin free MIT edition](https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template); UI is built with [Tamagui](https://github.com/tamagui/tamagui).

> Independent community port — not affiliated with TailAdmin or Tamagui commercial products. See [NOTICE](./NOTICE).

## Stack

- Expo SDK 57 + Expo Router
- Tamagui 2 (OSS UI kit + themes)
- Outfit font (TailAdmin default)
- Light / dark / system theme with persistence
- Configurable brand preset, density, content width

## Scripts

```bash
npm install
npm run web      # web
npm run ios      # iOS simulator
npm run android  # Android emulator
npm start        # Expo CLI
```

Clear Metro cache if styles look stale: `npx expo start -c`

## Phase status

| Phase | Status |
|-------|--------|
| 0 Scaffold + MIT/NOTICE + tokens | Done |
| 1 Shell (sidebar, header, theme, routes) | Done |
| 2 UI kit pages: buttons, alerts, badges, avatars, images, videos | Done |
| 3 Forms + basic tables | Done |
| 4 Ecommerce dashboard widgets + charts | Done |
| 5 Profile / calendar / auth polish | Done |
| 6 Config panel + polish | Partial (config context ready) |

## Licensing

- This repo: MIT
- Upstream TailAdmin free: MIT (attribution in NOTICE)
- Tamagui OSS: MIT
- Do **not** copy TailAdmin Pro or Tamagui Bento/Takeout Pro assets
