# Changelog

## [0.2.3] — 2026-09-10

### Fixed
- Modal / dropdown overlays on web (backdrop dismiss without nested Pressable)
- Landing hero web gradient typing (`backgroundImage` cast for RN ViewStyle)

### Added
- Landing page (`/landing`) and Cards gallery (`/cards`) with ChatTile
- Dashboard traffic pie chart (`TrafficPieCard` + `SimplePieChart`)
- Smoke probe coverage for new routes/components

## [0.2.2] — 2026-09-10

### Changed
- README / docs links use absolute GitHub URLs (fixes broken links on npm & GitHub Packages pages)
- Expanded `docs/components.md` (install, portals, routes, widgets)

## [0.2.1] — 2026-09-10

### Changed
- README rewritten as an open-source project page (install via `create-expo-app`)
- Package prepared for public npm as an Expo template

### Added
- `npm run smoke:template` (pack → scaffold → typecheck + UI inventory)
- Dual publish: npmjs + GitHub Packages (`@rahulsukla/verdant-tamagui-admin-template`)

## [0.2.0] — 2026-09-10

### Changed
- Rebrand UI to **Verdant** (generic admin template); TailAdmin mentioned only as inspiration
- GitHub repo renamed to `verdant-tamagui-admin-template`
- Default brand preset → verdant green (tweakcn Light Green–inspired mood)
- Profile demo data → John Doe with generated dummy avatars/products
- Remove sidebar “Purchase Plan” promo widget
- Fix user dropdown alignment; tighten Demographic + Recent Orders tiles
- Fix modal/dropdown fonts (re-mount Tamagui theme inside RN Modal portals)
- README rewritten (no phase checklist); component docs in `docs/components.md`

### Added
- KPI stat cards on the home dashboard
- Documents table page (`/documents`)
- Progress bars UI page (`/progress`)
- NOTICE notes for tweakcn Apache-2.0 inspiration
- `npm run audit:pages` (nav ↔ routes + UI brand check) wired into CI
- Generated dummy demo images (no TailAdmin stock photos)

## [0.1.0] — 2026-09-10

First public release (Expo + Tamagui admin template with Pages demo/CI).
