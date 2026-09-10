import { useWindowDimensions } from 'react-native'
import { Button, Input, Text, XStack, YStack } from 'tamagui'

import { CloseIcon, MenuIcon } from '@/components/icons'
import { ThemeToggleButton } from '@/components/ThemeToggleButton'
import { useConfigPanel } from '@/context/ConfigPanelContext'
import { useSidebar } from '@/context/SidebarContext'
import { useTemplateConfig } from '@/context/TemplateConfigContext'

export function AppHeader() {
  const { width } = useWindowDimensions()
  const isLg = width >= 1024
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar()
  const { toggle: toggleConfig } = useConfigPanel()
  const { brandColor } = useTemplateConfig()

  const onToggle = () => {
    if (isLg) toggleSidebar()
    else toggleMobileSidebar()
  }

  return (
    <YStack
      width="100%"
      bg="$backgroundStrong"
      borderBottomWidth={1}
      borderColor="$borderColor"
      z={40}
    >
      <XStack
        items="center"
        justify="space-between"
        px={isLg ? '$5' : '$3'}
        py={isLg ? '$3.5' : '$3'}
        gap="$3"
      >
        <XStack items="center" gap="$3" flex={1}>
          <Button
            unstyled
            width={44}
            height={44}
            items="center"
            justify="center"
            rounded={8}
            borderWidth={isLg ? 1 : 0}
            borderColor="$borderColor"
            onPress={onToggle}
            aria-label="Toggle Sidebar"
            hoverStyle={{ bg: '$backgroundHover' }}
          >
            {isMobileOpen && !isLg ? (
              <CloseIcon color="#667085" />
            ) : (
              <MenuIcon color="#667085" />
            )}
          </Button>

          {isLg ? (
            <XStack
              flex={1}
              maxW={420}
              items="center"
              borderWidth={1}
              borderColor="$borderColor"
              rounded={8}
              px="$3"
              height={44}
              bg="$background"
            >
              <Text color="$gray8" fontSize={14} mr="$2">
                ⌕
              </Text>
              <Input
                flex={1}
                unstyled
                placeholder="Search or type command..."
                placeholderTextColor="$placeholderColor"
                fontSize={14}
                color="$color"
              />
              <XStack
                borderWidth={1}
                borderColor="$borderColor"
                rounded={6}
                px="$2"
                py={2}
                bg="$backgroundStrong"
              >
                <Text fontSize={12} color="$gray10">
                  ⌘K
                </Text>
              </XStack>
            </XStack>
          ) : null}
        </XStack>

        <XStack items="center" gap="$2">
          <Button
            unstyled
            width={44}
            height={44}
            items="center"
            justify="center"
            rounded={8}
            borderWidth={1}
            borderColor="$borderColor"
            bg="$backgroundStrong"
            onPress={toggleConfig}
            aria-label="Open template settings"
            hoverStyle={{ bg: '$backgroundHover' }}
          >
            <Text fontSize={16} color="$gray11">
              ⚙
            </Text>
          </Button>
          <ThemeToggleButton />
          <XStack
            width={44}
            height={44}
            rounded={999}
            items="center"
            justify="center"
            bg="$blue3"
            borderWidth={1}
            borderColor="$borderColor"
          >
            <Text fontWeight="700" color={brandColor as any} fontSize={14}>
              RS
            </Text>
          </XStack>
        </XStack>
      </XStack>
    </YStack>
  )
}
