/**
 * Verdant brand palette — light-green inspired (tweakcn “Light Green” mood),
 * not a 1:1 copy of any upstream CSS. Blue kept as an optional preset.
 */

export const brand = {
  25: '#f3faf6',
  50: '#e8f6ef',
  100: '#d1eedc',
  200: '#a8dfc0',
  300: '#74c89a',
  400: '#4aad78',
  500: '#3d8b6e',
  600: '#2f7058',
  700: '#275a48',
  800: '#22483b',
  900: '#1d3c32',
  950: '#0f211c',
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

/** Brand presets for the template config panel */
export const brandPresets = {
  verdant: brand[500],
  blue: '#465fff',
  indigo: '#4f46e5',
  teal: '#0d9488',
  rose: '#e11d48',
  amber: '#d97706',
} as const

export type BrandPreset = keyof typeof brandPresets
