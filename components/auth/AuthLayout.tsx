import type { ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'
import { Link } from 'expo-router'
import { Text, XStack, YStack } from 'tamagui'

import { ThemeToggleButton } from '@/components/ThemeToggleButton'
import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { brand } from '@/theme/colors'

export function AuthLayout({ children }: { children: ReactNode }) {
  const { width } = useWindowDimensions()
  const showAside = width >= 1024
  const { brandColor } = useTemplateConfig()

  return (
    <YStack flex={1} bg="$backgroundStrong" minH="100%">
      <XStack flex={1} minH="100%">
        <YStack flex={1} p="$5" justify="center">
          {children}
        </YStack>
        {showAside ? (
          <YStack
            flex={1}
            bg={brand[950] as any}
            items="center"
            justify="center"
            p="$6"
          >
            <YStack items="center" gap="$4" maxW={320}>
              <Link href="/" asChild>
                <XStack items="center" gap="$2" cursor="pointer">
                  <YStack
                    width={40}
                    height={40}
                    rounded={10}
                    bg={brandColor as any}
                    items="center"
                    justify="center"
                  >
                    <Text color="#fff" fontWeight="700" fontSize={18}>
                      T
                    </Text>
                  </YStack>
                  <Text color="#fff" fontSize={28} fontWeight="700">
                    TailAdmin
                  </Text>
                </XStack>
              </Link>
              <Text text="center" color="rgba(255,255,255,0.65)" fontSize={14}>
                Free and Open-Source Tailwind CSS Admin Dashboard Template — Tamagui
                edition
              </Text>
            </YStack>
          </YStack>
        ) : null}
      </XStack>
      <YStack position="absolute" b={24} r={24} z={20}>
        <ThemeToggleButton />
      </YStack>
    </YStack>
  )
}
