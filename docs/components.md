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

React Native `Modal` portals outside the main Tamagui root on web (fonts/theme drop off). Wrap portal content with:

```tsx
import { PortalProviders } from '@/components/PortalProviders'
```

Already used by `AppModal`, user/notification dropdowns, and the config panel.

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

Marketing-style hero + feature strip inside the admin shell: `/landing` (Pages → Landing).

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

## Page inventory audit

```bash
npm run audit:pages
```

Fails CI if a nav `href` has no matching Expo Router file, or if `TailAdmin` / `Musharof` branding appears under `app/`, `components/`, or `layout/`.

## Adding a page

1. Create `app/(dashboard)/my-page.tsx`
2. Add a link in [`navigation/navItems.ts`](https://github.com/rahulsukla/verdant-tamagui-admin-template/blob/main/navigation/navItems.ts)
3. Prefer `PageBreadcrumb` + existing cards/primitives
4. Run `npm run typecheck`

## Demo assets

User/product placeholders under `assets/demo/` are **generated dummies** (not TailAdmin media). Replace with your own brand assets for production.
