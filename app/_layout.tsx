import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  useFonts,
} from '@expo-google-fonts/outfit'
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider as NavigationThemeProvider,
} from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'

import { TemplateConfigProvider } from '@/context/TemplateConfigContext'
import { ThemeModeProvider, useThemeMode } from '@/context/ThemeContext'
import { tamaguiConfig } from '@/tamagui.config'

export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

if (Platform.OS === 'web') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../tamagui.generated.css')
  } catch {
    // css may not exist until first metro run
  }
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded) return null

  return (
    <ThemeModeProvider>
      <TemplateConfigProvider>
        <RootProviders />
      </TemplateConfigProvider>
    </ThemeModeProvider>
  )
}

function RootProviders() {
  const { resolvedTheme } = useThemeMode()

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={resolvedTheme}>
      <Theme name={resolvedTheme}>
        <NavigationThemeProvider
          value={resolvedTheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(dashboard)" />
            <Stack.Screen name="signin" />
            <Stack.Screen name="signup" />
          </Stack>
        </NavigationThemeProvider>
      </Theme>
    </TamaguiProvider>
  )
}
