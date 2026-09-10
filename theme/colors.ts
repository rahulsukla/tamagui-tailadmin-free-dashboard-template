/**
 * TailAdmin free palette (from community edition CSS tokens).
 * Source: TailAdmin MIT — see NOTICE.
 */

export const brand = {
  25: '#f2f7ff',
  50: '#ecf3ff',
  100: '#dde9ff',
  200: '#c2d6ff',
  300: '#9cb9ff',
  400: '#7592ff',
  500: '#465fff',
  600: '#3641f5',
  700: '#2a31d8',
  800: '#252dae',
  900: '#262e89',
  950: '#161950',
} as const

export const gray = {
  25: '#fcfcfd',
  50: '#f9fafb',
  100: '#f2f4f7',
  200: '#e4e7ec',
  300: '#d0d5dd',
  400: '#98a2b3',
  500: '#667085',
  600: '#475467',
  700: '#344054',
  800: '#1d2939',
  900: '#101828',
  950: '#0c111d',
  dark: '#1a2231',
} as const

export const success = {
  50: '#ecfdf3',
  100: '#d1fadf',
  500: '#12b76a',
  600: '#039855',
} as const

export const error = {
  50: '#fef3f2',
  100: '#fee4e2',
  500: '#f04438',
  600: '#d92d20',
} as const

export const warning = {
  50: '#fffaeb',
  100: '#fef0c7',
  500: '#f79009',
  600: '#dc6803',
} as const

/** Optional brand presets for the template config panel */
export const brandPresets = {
  blue: brand[500],
  indigo: '#4f46e5',
  teal: '#0d9488',
  rose: '#e11d48',
  amber: '#d97706',
} as const

export type BrandPreset = keyof typeof brandPresets
