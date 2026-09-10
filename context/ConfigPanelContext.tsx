import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type ConfigPanelContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const ConfigPanelContext = createContext<ConfigPanelContextValue | undefined>(undefined)

export function ConfigPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen((v) => !v), [])

  const value = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [isOpen, open, close, toggle]
  )

  return (
    <ConfigPanelContext.Provider value={value}>{children}</ConfigPanelContext.Provider>
  )
}

export function useConfigPanel() {
  const ctx = useContext(ConfigPanelContext)
  if (!ctx) throw new Error('useConfigPanel must be used within ConfigPanelProvider')
  return ctx
}
