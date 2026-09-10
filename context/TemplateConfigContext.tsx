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

import { brandPresets, type BrandPreset } from '@/theme/colors'

export type Density = 'comfortable' | 'compact'
export type SidebarMode = 'expanded' | 'collapsed'

export type TemplateConfig = {
  brandPreset: BrandPreset
  density: Density
  stickyHeader: boolean
  contentMaxWidth: number
}

type TemplateConfigContextValue = {
  config: TemplateConfig
  brandColor: string
  setBrandPreset: (preset: BrandPreset) => void
  setDensity: (density: Density) => void
  setStickyHeader: (sticky: boolean) => void
  updateConfig: (partial: Partial<TemplateConfig>) => void
  resetConfig: () => void
}

const STORAGE_KEY = 'template.config'
const defaults: TemplateConfig = {
  brandPreset: 'verdant',
  density: 'comfortable',
  stickyHeader: true,
  contentMaxWidth: 1536,
}

const TemplateConfigContext = createContext<TemplateConfigContextValue | undefined>(undefined)

export function TemplateConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<TemplateConfig>(defaults)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY)
        if (!cancelled && raw) {
          setConfig({ ...defaults, ...JSON.parse(raw) })
        }
      } catch {
        // ignore corrupt storage
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const persist = useCallback((next: TemplateConfig) => {
    setConfig(next)
    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const updateConfig = useCallback(
    (partial: Partial<TemplateConfig>) => {
      persist({ ...config, ...partial })
    },
    [config, persist]
  )

  const resetConfig = useCallback(() => {
    persist(defaults)
  }, [persist])

  const value = useMemo<TemplateConfigContextValue>(
    () => ({
      config,
      brandColor: brandPresets[config.brandPreset],
      setBrandPreset: (brandPreset) => updateConfig({ brandPreset }),
      setDensity: (density) => updateConfig({ density }),
      setStickyHeader: (stickyHeader) => updateConfig({ stickyHeader }),
      updateConfig,
      resetConfig,
    }),
    [config, updateConfig, resetConfig]
  )

  return (
    <TemplateConfigContext.Provider value={value}>{children}</TemplateConfigContext.Provider>
  )
}

export function useTemplateConfig() {
  const ctx = useContext(TemplateConfigContext)
  if (!ctx) throw new Error('useTemplateConfig must be used within TemplateConfigProvider')
  return ctx
}
