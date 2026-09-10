# Changelog

## [0.2.5] — 2026-09-11

### Fixed
- Basic / documents / recent-orders tables empty on desktop web: nested vertical `ScrollView` (`horizontal={compact}`) collapsed to 0 height — only use horizontal scroll when compact
- Dashboard demographic / traffic pie overflow: contain map + legend rows, scale pie to card width, home footer `pb={24}`

### Added
- `npm run audit:ui` (+ `npm run audit`) gates: demo row data, Dropzone/Calendar/Landing markers, ban on `horizontal={compact}`, `template-stats.json` presence
- `npm run stats:template` writes measured pack size + file/route counts to `docs/template-stats.json`
- Dashboard `TemplateStatsCard` tile (real metrics, light/dark Tamagui card)
- CI + publish workflows run stats refresh + full audit

## [0.2.4] — 2026-09-11

### Fixed
- Text overflow in KPI, metrics, profile fields, alerts, badges, and chat composer
- Tables fill card width on desktop (`BasicTableOne`, `DocumentsTable`); compact horizontal scroll
- Charts size to card width (`useContainerWidth`) instead of viewport
- Monthly Target radial scales to container; image/video grids no longer overflow with % + gap

### Changed
- Landing page redesigned as a richer multi-section marketing layout (hero, features, steps, showcase, FAQ, CTA)

### Added
- Docs note on layout/overflow conventions

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
