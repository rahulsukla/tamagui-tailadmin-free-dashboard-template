import { Button } from 'tamagui'

import { MoonIcon, SunIcon } from '@/components/icons'
import { useThemeMode } from '@/context/ThemeContext'

export function ThemeToggleButton() {
  const { resolvedTheme, toggleTheme } = useThemeMode()

  return (
    <Button
      circular
      size="$4"
      chromeless
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      onPress={toggleTheme}
      aria-label="Toggle theme"
      hoverStyle={{ bg: '$backgroundHover' }}
      pressStyle={{ opacity: 0.85 }}
      icon={
        resolvedTheme === 'dark' ? (
          <SunIcon color="#98a2b3" />
        ) : (
          <MoonIcon color="#667085" />
        )
      }
    />
  )
}
