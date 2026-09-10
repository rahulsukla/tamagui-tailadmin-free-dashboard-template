import type { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'

import { useThemeMode } from '@/context/ThemeContext'
import { gray } from '@/theme/colors'
import { tamaguiConfig } from '@/tamagui.config'

/**
 * React Native `Modal` portals outside the main Tamagui root on web, so theme
 * CSS variables and Outfit font faces drop off (Times + default blue links).
 * Re-mount providers inside every modal/dropdown portal.
 */
export function PortalProviders({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useThemeMode()

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={resolvedTheme}>
      <Theme name={resolvedTheme}>{children}</Theme>
    </TamaguiProvider>
  )
}

/** Solid chrome for RN Modal portals — Tamagui token CSS often does not apply there. */
export function usePortalChrome() {
  const { resolvedTheme } = useThemeMode()
  const dark = resolvedTheme === 'dark'
  return {
    dark,
    overlayDim: dark ? 'rgba(0,0,0,0.72)' : 'rgba(16,24,40,0.5)',
    overlayDimSoft: dark ? 'rgba(0,0,0,0.45)' : 'rgba(16,24,40,0.35)',
    panelBg: dark ? gray[900] : '#ffffff',
    panelBorder: dark ? gray[800] : gray[200],
    text: dark ? gray[100] : gray[800],
    muted: dark ? gray[400] : gray[600],
  }
}

export const portalOverlayBase = StyleSheet.create({
  fill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    padding: 16,
  },
})
