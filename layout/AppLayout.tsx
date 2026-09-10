import { Slot } from 'expo-router'
import { ScrollView, useWindowDimensions } from 'react-native'
import { YStack } from 'tamagui'

import { ConfigPanel } from '@/components/ConfigPanel'
import { ConfigPanelProvider } from '@/context/ConfigPanelContext'
import { SidebarProvider, useSidebar } from '@/context/SidebarContext'
import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { AppHeader } from '@/layout/AppHeader'
import { AppSidebar } from '@/layout/AppSidebar'
import { Backdrop } from '@/layout/Backdrop'

function LayoutContent() {
  const { contentOffset } = useSidebar()
  const { width } = useWindowDimensions()
  const { config } = useTemplateConfig()
  const pad = config.density === 'compact' ? '$3' : width >= 768 ? '$5' : '$4'

  const page = (
    <YStack
      p={pad}
      maxW={config.contentMaxWidth}
      width="100%"
      self="center"
      flex={1}
    >
      <Slot />
    </YStack>
  )

  return (
    <YStack flex={1} bg="$background" minH="100%">
      <AppSidebar />
      <Backdrop />
      <ConfigPanel />
      <YStack flex={1} pl={contentOffset} style={{ minHeight: '100%' }}>
        {config.stickyHeader ? (
          <>
            <AppHeader />
            <ScrollView
              contentContainerStyle={{ padding: 0, flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {page}
            </ScrollView>
          </>
        ) : (
          <ScrollView
            contentContainerStyle={{ padding: 0, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <AppHeader />
            {page}
          </ScrollView>
        )}
      </YStack>
    </YStack>
  )
}

export function AppLayout() {
  return (
    <SidebarProvider>
      <ConfigPanelProvider>
        <LayoutContent />
      </ConfigPanelProvider>
    </SidebarProvider>
  )
}
