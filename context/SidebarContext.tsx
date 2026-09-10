import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useWindowDimensions } from 'react-native'

type SidebarContextValue = {
  isExpanded: boolean
  isMobileOpen: boolean
  isHovered: boolean
  isMobile: boolean
  sidebarWidth: number
  contentOffset: number
  toggleSidebar: () => void
  toggleMobileSidebar: () => void
  setIsHovered: (hovered: boolean) => void
  closeMobileSidebar: () => void
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

const EXPANDED_WIDTH = 290
const COLLAPSED_WIDTH = 90
const MOBILE_BREAKPOINT = 768
const DESKTOP_SIDEBAR_BREAKPOINT = 1024

export function SidebarProvider({ children }: { children: ReactNode }) {
  const { width } = useWindowDimensions()
  const isMobile = width < MOBILE_BREAKPOINT
  const isDesktopSidebar = width >= DESKTOP_SIDEBAR_BREAKPOINT

  const [isExpanded, setIsExpanded] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isMobile) setIsMobileOpen(false)
  }, [isMobile])

  const toggleSidebar = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileOpen((prev) => !prev)
  }, [])

  const closeMobileSidebar = useCallback(() => {
    setIsMobileOpen(false)
  }, [])

  const effectiveExpanded = isMobile ? false : isExpanded
  // Content margin follows expanded OR hovered sidebar width.
  const showWide = effectiveExpanded || isHovered || isMobileOpen
  const sidebarWidth = showWide ? EXPANDED_WIDTH : COLLAPSED_WIDTH
  // Keep main column offset stable on hover (sidebar overlays when collapsed+hover)
  // so pages do not jump horizontally while browsing the menu.
  const contentOffset = isDesktopSidebar
    ? effectiveExpanded
      ? EXPANDED_WIDTH
      : COLLAPSED_WIDTH
    : 0

  const value = useMemo(
    () => ({
      isExpanded: effectiveExpanded,
      isMobileOpen,
      isHovered,
      isMobile,
      sidebarWidth,
      contentOffset,
      toggleSidebar,
      toggleMobileSidebar,
      setIsHovered,
      closeMobileSidebar,
    }),
    [
      effectiveExpanded,
      isMobileOpen,
      isHovered,
      isMobile,
      sidebarWidth,
      contentOffset,
      toggleSidebar,
      toggleMobileSidebar,
      closeMobileSidebar,
    ]
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}
