import type { ReactNode } from 'react'
import { TamaguiProvider, Theme } from 'tamagui'

import { useThemeMode } from '@/context/ThemeContext'
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
