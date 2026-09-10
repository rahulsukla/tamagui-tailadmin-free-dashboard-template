# Component usage

Verdant ships Tamagui-based primitives and page sections. Import from `@/components/...` using the path aliases in `tsconfig.json`.

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

Demo gallery: `/form-elements`.

## Page inventory audit

```bash
npm run audit:pages
```

Fails CI if a nav `href` has no matching Expo Router file, or if `TailAdmin` / `Musharof` branding appears under `app/`, `components/`, or `layout/`.

## Progress

```tsx
import { ProgressBar } from '@/components/ui/ProgressBar'

<ProgressBar label="Onboarding" value={72} hint="3 of 4 steps" />
```

Demo: `/progress`.

## Charts (SVG)

```tsx
import { SimpleBarChart } from '@/components/charts/SimpleBarChart'
import { SimpleAreaChart } from '@/components/charts/SimpleAreaChart'

<SimpleBarChart data={[10, 20, 15, 30]} />
<SimpleAreaChart series={[{ name: 'Sales', data: [...], color: brandColor }]} />
```

Cross-platform via `react-native-svg` — no ApexCharts.

## Tables

- `BasicTableOne` — team/project table (`/basic-tables`)
- `DocumentsTable` — document checklist inspired by tweakcn Light Green (`/documents`)
- `RecentOrders` — ecommerce orders widget on the home dashboard

## Ecommerce widgets

| Component | Role |
|-----------|------|
| `KpiStatCards` | Four KPI tiles (revenue / customers / accounts / growth) |
| `EcommerceMetrics` | Customers + Orders |
| `MonthlySalesChart` | Bar chart card |
| `MonthlyTarget` | Radial progress target |
| `StatisticsChart` | Dual series area chart |
| `DemographicCard` | Map silhouette + country bars |
| `RecentOrders` | Product orders table |

Compose them like `app/(dashboard)/index.tsx`.

## Profile & calendar

- Profile cards: `UserMetaCard`, `UserInfoCard`, `UserAddressCard` + `AppModal`
- Calendar: `CalendarBoard` month grid with create/edit events

## Adding a page

1. Create `app/(dashboard)/my-page.tsx`
2. Add a link in `navigation/navItems.ts`
3. Prefer `PageBreadcrumb` + existing cards/primitives
4. Run `npm run typecheck`

## Demo assets

User/product placeholders under `assets/demo/` are **generated dummies** (not TailAdmin media). Replace with your own brand assets for production.
