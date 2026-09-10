import { Link } from 'expo-router'
import { Text, XStack, YStack } from 'tamagui'

import { useSidebar } from '@/context/SidebarContext'
import { useThemeMode } from '@/context/ThemeContext'
import { brand } from '@/theme/colors'

export function BrandLogo() {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar()
  const { resolvedTheme } = useThemeMode()
  const wide = isExpanded || isHovered || isMobileOpen

  return (
    <Link href="/" asChild>
      <XStack items="center" gap="$2" cursor="pointer" pressStyle={{ opacity: 0.85 }}>
        <YStack width={32} height={32} rounded={8} items="center" justify="center" bg={brand[500]}>
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
