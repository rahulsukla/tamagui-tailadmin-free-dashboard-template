import { Link } from 'expo-router'
import { Text, XStack, YStack } from 'tamagui'

import { useSidebar } from '@/context/SidebarContext'
import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { useThemeMode } from '@/context/ThemeContext'

export function BrandLogo() {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar()
  const { resolvedTheme } = useThemeMode()
  const { brandColor } = useTemplateConfig()
  const wide = isExpanded || isHovered || isMobileOpen

  return (
    <Link href="/" asChild>
      <XStack items="center" gap="$2" cursor="pointer" pressStyle={{ opacity: 0.85 }}>
        <YStack
          width={32}
          height={32}
          rounded={8}
          items="center"
          justify="center"
          bg={brandColor as any}
        >
          <Text color="#fff" fontWeight="700" fontSize={14}>
            T
          </Text>
        </YStack>
        {wide ? (
          <YStack>
            <Text
              fontSize={20}
              fontWeight="700"
              color={resolvedTheme === 'dark' ? '#fff' : '#101828'}
              letterSpacing={-0.3}
            >
              TailAdmin
            </Text>
            <Text fontSize={10} color="$gray10" mt={-2}>
              Tamagui edition
            </Text>
          </YStack>
        ) : null}
      </XStack>
    </Link>
  )
}
