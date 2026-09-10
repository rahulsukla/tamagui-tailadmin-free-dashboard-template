import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useColorScheme as useSystemColorScheme } from 'react-native'

export type ColorMode = 'light' | 'dark' | 'system'

type ThemeContextValue = {
  colorMode: ColorMode
  resolvedTheme: 'light' | 'dark'
  setColorMode: (mode: ColorMode) => void
  toggleTheme: () => void
}

const STORAGE_KEY = 'template.colorMode'
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const system = useSystemColorScheme()
  const [colorMode, setColorModeState] = useState<ColorMode>('light')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY)
        if (!cancelled && (saved === 'light' || saved === 'dark' || saved === 'system')) {
          setColorModeState(saved)
        }
      } catch {
        // ignore
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode)
    void AsyncStorage.setItem(STORAGE_KEY, mode)
  }, [])

  const resolvedTheme: 'light' | 'dark' =
    colorMode === 'system' ? (system === 'dark' ? 'dark' : 'light') : colorMode

  const toggleTheme = useCallback(() => {
    setColorMode(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setColorMode])

  const value = useMemo(
    () => ({ colorMode, resolvedTheme, setColorMode, toggleTheme }),
    [colorMode, resolvedTheme, setColorMode, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeMode() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeMode must be used within ThemeModeProvider')
  return ctx
}
