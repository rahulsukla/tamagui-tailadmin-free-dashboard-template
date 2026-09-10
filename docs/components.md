# Component usage

Verdant is an **Expo app template** (not a separate component library npm import). After scaffolding, import from `@/components/...` using the path alias in `tsconfig.json`.

- Repo: https://github.com/rahulsukla/verdant-tamagui-admin-template
- Demo: https://rahulsukla.github.io/verdant-tamagui-admin-template/
- npm: https://www.npmjs.com/package/verdant-tamagui-admin-template

```bash
npx create-expo-app@latest my-admin --template verdant-tamagui-admin-template
cd my-admin
npm run web
```

## Theming

```tsx
import { useThemeMode } from '@/context/ThemeContext'
import { useTemplateConfig } from '@/context/TemplateConfigContext'

const { resolvedTheme, setColorMode, toggleTheme } = useThemeMode()
const { brandColor, config, setBrandPreset, setDensity } = useTemplateConfig()
```

- `useThemeMode` — `light` | `dark` | `system` (persisted)
- `useTemplateConfig` — brand preset, density, sticky header, content max width
- Prefer `brandColor` for accents instead of hard-coded greens/blues

Open the header **⚙** panel to preview presets at runtime.

## Layout shell

```tsx
import { AppLayout } from '@/layout/AppLayout'
```

Used by `app/(dashboard)/_layout.tsx`. Provides sidebar, header, config panel, and content padding.

Auth pages use:

```tsx
import { AuthLayout } from '@/components/auth/AuthLayout'
```

## Modals & dropdown portals

On **web**, `AppModal` and header dropdowns use a fixed in-tree overlay (RN `Modal` drops Tamagui theme CSS). On **native**, they still use `Modal` + `PortalProviders`.

```tsx
import { PortalProviders } from '@/components/PortalProviders'
```

## Buttons

```tsx
import { AppButton } from '@/components/ui/Button'

<AppButton variant="primary" size="md" onPress={...}>Save</AppButton>
<AppButton variant="outline" size="sm">Cancel</AppButton>
```

Primary fill uses the active brand preset.

## Feedback

```tsx
import { Alert } from '@/components/ui/Alert'
import { Badge } from '@/components/ui/Badge'

<Alert variant="success" title="Saved" message="Profile updated." />
<Badge color="primary" variant="light">New</Badge>
```

## Forms

```tsx
import { AppInput } from '@/components/form/Input'
import { Label } from '@/components/form/Label'
import { AppSelect } from '@/components/form/Select'
import { Checkbox } from '@/components/form/Checkbox'
import { Radio } from '@/components/form/Radio'
import { Switch } from '@/components/form/Switch'
import { AppTextArea } from '@/components/form/TextArea'

<Label>Email</Label>
<AppInput placeholder="you@example.com" keyboardType="email-address" />
<AppSelect options={[{ value: 'a', label: 'Option A' }]} onChange={setValue} />
<Checkbox label="Remember me" checked={on} onChange={setOn} />
```

Demo gallery route: `/form-elements`

## Progress

```tsx
import { ProgressBar } from '@/components/ui/ProgressBar'

<ProgressBar label="Onboarding" value={72} hint="3 of 4 steps" />
```

Demo route: `/progress`

## Charts (SVG)

```tsx
import { SimpleBarChart } from '@/components/charts/SimpleBarChart'
import { SimpleAreaChart } from '@/components/charts/SimpleAreaChart'

<SimpleBarChart data={[10, 20, 15, 30]} />
<SimpleAreaChart series={[{ name: 'Sales', data: [...], color: brandColor }]} />
```

Cross-platform via `react-native-svg` — no ApexCharts.

## Tables

| Component | Route / use |
|-----------|-------------|
| `BasicTableOne` | `/basic-tables` |
| `DocumentsTable` | `/documents` (tweakcn Light Green–inspired checklist) |
| `RecentOrders` | Home ecommerce widget |

## Cards / tiles

Import from `@/components/cards/TileVariants`:

| Component | Role |
|-----------|------|
| `MetricTile` | KPI number + delta |
| `AccentTile` | Brand callout with CTA |
| `StatusTile` | Title + health badge |
| `FeatureTile` | Icon + short description |
| `ChatTile` | Dummy chat thread + composer |

Demo route: `/cards`

## Landing page

Rich marketing-style page inside the admin shell: `/landing` (Menu → **Pages** → **Landing**).

Includes hero + live preview, feature grid, how-it-works, route showcase, trust checklist, FAQ accordion, and final CTA. With the sidebar collapsed, click the document/page icon for a flyout.

## Layout & overflow

Cards, tables, and charts should fill their container without spilling text:

- Tables (`BasicTableOne`, `DocumentsTable`, `RecentOrders`) flex columns on wide screens; **only** wrap in a horizontal `ScrollView` when compact — never `horizontal={compact}` (vertical nested scroll collapses on web)
- Charts measure parent width via `useContainerWidth` instead of the viewport
- Flex text rows use `minW={0}` + `numberOfLines` so labels stay inside cards

## Ecommerce widgets

| Component | Role |
|-----------|------|
| `KpiStatCards` | Four KPI tiles |
| `EcommerceMetrics` | Customers + Orders |
| `MonthlySalesChart` | Bar chart card |
| `MonthlyTarget` | Radial progress target |
| `StatisticsChart` | Dual series area chart |
| `DemographicCard` | Map silhouette + country bars |
| `RecentOrders` | Product orders table |
| `TrafficPieCard` | Donut / pie traffic split (`SimplePieChart`) |
| `TemplateStatsCard` | Real OSS metrics from `docs/template-stats.json` |

Compose them like [`app/(dashboard)/index.tsx`](https://github.com/rahulsukla/verdant-tamagui-admin-template/blob/main/app/(dashboard)/index.tsx).

## Profile & calendar

- Profile: `UserMetaCard`, `UserInfoCard`, `UserAddressCard` + `AppModal` from `@/components/profile/shared`
- Calendar: `CalendarBoard` month grid with create/edit events

## UI kit routes

| Route | Content |
|-------|---------|
| `/alerts` | Alert variants |
| `/avatars` | Avatar sizes |
| `/badge` | Badges |
| `/buttons` | Buttons |
| `/images` | Image grids |
| `/videos` | Video embeds |
| `/progress` | Progress bars |

## Page inventory + UI audits

```bash
npm run audit:pages   # nav hrefs ↔ Expo Router files + brand guard
npm run audit:ui      # demo data markers, table scroll safety, template-stats.json
npm run audit         # both
npm run stats:template  # refresh docs/template-stats.json (npm pack size + file counts)
```

CI runs `stats:template` then `audit` on every push/PR. `prepack` runs typecheck + stats + audit so empty tables / broken key demos fail before publish.

`audit:ui` specifically fails if tables use `horizontal={compact}` (nested vertical `ScrollView` collapses to 0 height on desktop web — the 0.2.4 Basic Table bug).

## Adding a page

1. Create `app/(dashboard)/my-page.tsx`
2. Add a link in [`navigation/navItems.ts`](https://github.com/rahulsukla/verdant-tamagui-admin-template/blob/main/navigation/navItems.ts)
3. Prefer `PageBreadcrumb` + existing cards/primitives
4. Run `npm run typecheck`

## Demo assets

User/product placeholders under `assets/demo/` are **generated dummies** (not TailAdmin media). Replace with your own brand assets for production.
