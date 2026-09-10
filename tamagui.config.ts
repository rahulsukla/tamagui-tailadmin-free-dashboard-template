import { defaultConfig } from '@tamagui/config/v5'
import { createFont, createTamagui } from 'tamagui'

import { brand, error, gray, success, warning } from './theme/colors'

const outfitFace = {
  normal: { normal: 'Outfit_400Regular' },
  500: { normal: 'Outfit_500Medium' },
  600: { normal: 'Outfit_600SemiBold' },
  700: { normal: 'Outfit_700Bold' },
  bold: { normal: 'Outfit_700Bold' },
}

const outfit = createFont({
  family: 'Outfit_400Regular',
  size: defaultConfig.fonts.body.size,
  lineHeight: defaultConfig.fonts.body.lineHeight,
  weight: defaultConfig.fonts.body.weight,
  letterSpacing: defaultConfig.fonts.body.letterSpacing,
  face: outfitFace,
})

const lightOverrides = {
  background: gray[50],
  backgroundHover: gray[100],
  backgroundPress: gray[100],
  backgroundFocus: gray[100],
  backgroundStrong: '#ffffff',
  backgroundTransparent: 'rgba(255,255,255,0)',
  color: gray[800],
  colorHover: gray[900],
  colorPress: gray[900],
  colorFocus: gray[900],
  colorTransparent: 'rgba(16,24,40,0)',
  borderColor: gray[200],
  borderColorHover: gray[300],
  borderColorFocus: brand[300],
  borderColorPress: gray[300],
  placeholderColor: gray[400],
  outlineColor: brand[500],
  shadowColor: 'rgba(16, 24, 40, 0.1)',

  // Map brand → blue scale used by Tamagui components
  blue1: brand[25],
  blue2: brand[50],
  blue3: brand[100],
  blue4: brand[200],
  blue5: brand[300],
  blue6: brand[400],
  blue7: brand[500],
  blue8: brand[600],
  blue9: brand[500],
  blue10: brand[600],
  blue11: brand[700],
  blue12: brand[900],

  gray1: gray[25],
  gray2: gray[50],
  gray3: gray[100],
  gray4: gray[200],
  gray5: gray[300],
  gray6: gray[400],
  gray7: gray[500],
  gray8: gray[600],
  gray9: gray[700],
  gray10: gray[700],
  gray11: gray[600],
  gray12: gray[900],

  green5: success[100],
  green9: success[500],
  green10: success[600],
  red5: error[100],
  red9: error[500],
  red10: error[600],
  yellow5: warning[100],
  yellow9: warning[500],
  yellow10: warning[600],

  accentBackground: brand[50],
  accentColor: brand[500],
}

const darkOverrides = {
  background: gray[950],
  backgroundHover: gray[900],
  backgroundPress: gray[900],
  backgroundFocus: gray[900],
  backgroundStrong: gray[900],
  backgroundTransparent: 'rgba(0,0,0,0)',
  color: gray[100],
  colorHover: '#ffffff',
  colorPress: '#ffffff',
  colorFocus: '#ffffff',
  colorTransparent: 'rgba(255,255,255,0)',
  borderColor: gray[800],
  borderColorHover: gray[700],
  borderColorFocus: brand[400],
  borderColorPress: gray[700],
  placeholderColor: gray[500],
  outlineColor: brand[400],
  shadowColor: 'rgba(0, 0, 0, 0.4)',

  blue1: brand[950],
  blue2: brand[900],
  blue3: brand[800],
  blue4: brand[700],
  blue5: brand[600],
  blue6: brand[500],
  blue7: brand[400],
  blue8: brand[400],
  blue9: brand[500],
  blue10: brand[400],
  blue11: brand[300],
  blue12: brand[100],

  gray1: gray[950],
  gray2: gray[900],
  gray3: gray.dark,
  gray4: gray[800],
  gray5: gray[700],
  gray6: gray[600],
  gray7: gray[500],
  gray8: gray[400],
  gray9: gray[300],
  gray10: gray[400],
  gray11: gray[300],
  gray12: gray[100],

  green5: 'rgba(18,183,106,0.16)',
  green9: success[500],
  green10: success[50],
  red5: 'rgba(240,68,56,0.16)',
  red9: error[500],
  red10: error[50],
  yellow5: 'rgba(247,144,9,0.16)',
  yellow9: warning[500],
  yellow10: warning[50],

  accentBackground: 'rgba(70,95,255,0.12)',
  accentColor: brand[400],
}

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  fonts: {
    ...defaultConfig.fonts,
    heading: outfit,
    body: outfit,
  },
  themes: {
    ...defaultConfig.themes,
    light: {
      ...defaultConfig.themes.light,
      ...lightOverrides,
    },
    dark: {
      ...defaultConfig.themes.dark,
      ...darkOverrides,
    },
  },
  settings: {
    ...defaultConfig.settings,
    // Prefer CSS variables on web for theme switching
    fastSchemeChange: true,
  },
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}
