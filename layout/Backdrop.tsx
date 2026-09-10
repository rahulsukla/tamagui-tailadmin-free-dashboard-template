import { useWindowDimensions } from 'react-native'
import { YStack } from 'tamagui'

import { useSidebar } from '@/context/SidebarContext'

export function Backdrop() {
  const { width } = useWindowDimensions()
  const isLg = width >= 1024
  const { isMobileOpen, closeMobileSidebar } = useSidebar()

  if (isLg || !isMobileOpen) return null

  return (
    <YStack
      position="absolute"
      t={0}
      l={0}
      r={0}
      b={0}
      z={40}
      bg="rgba(16,24,40,0.45)"
      onPress={closeMobileSidebar}
      cursor="pointer"
    />
  )
}
