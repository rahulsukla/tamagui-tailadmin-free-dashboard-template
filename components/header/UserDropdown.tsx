import { useState } from 'react'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { Modal, Pressable, useWindowDimensions } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { useTemplateConfig } from '@/context/TemplateConfigContext'

const LINKS = [
  { label: 'Edit profile', href: '/profile' as const },
  { label: 'Account settings', href: '/profile' as const },
  { label: 'Support', href: '/blank' as const },
]

export function UserDropdown() {
  const [open, setOpen] = useState(false)
  const { width } = useWindowDimensions()
  const { brandColor } = useTemplateConfig()
  const showName = width >= 640

  return (
    <>
      <Pressable onPress={() => setOpen(true)} accessibilityLabel="User menu">
        <XStack items="center" gap="$2">
          <Image
            source={require('@/assets/demo/user/owner.jpg')}
            style={{ width: 44, height: 44, borderRadius: 22 }}
            contentFit="cover"
          />
          {showName ? (
            <Text fontSize={14} fontWeight="500" color="$gray11">
              Musharof
            </Text>
          ) : null}
          <Text fontSize={12} color="$gray10">
            ▾
          </Text>
        </XStack>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable
          onPress={() => setOpen(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(16,24,40,0.35)',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            paddingTop: 64,
            paddingRight: 12,
          }}
        >
          <Pressable onPress={() => {}}>
            <YStack
              width={260}
              bg="$backgroundStrong"
              borderWidth={1}
              borderColor="$borderColor"
              rounded={16}
              p="$3"
              gap="$3"
            >
              <YStack gap={2} pb="$3" borderBottomWidth={1} borderColor="$borderColor">
                <Text fontSize={14} fontWeight="600" color="$color">
                  Musharof Chowdhury
                </Text>
                <Text fontSize={12} color="$gray10">
                  randomuser@pimjo.com
                </Text>
              </YStack>

              <YStack gap={2}>
                {LINKS.map((item) => (
                  <Link key={item.label} href={item.href} asChild>
                    <Pressable onPress={() => setOpen(false)}>
                      <XStack
                        px="$3"
                        py="$2.5"
                        rounded={8}
                        hoverStyle={{ bg: '$backgroundHover' }}
                      >
                        <Text fontSize={14} fontWeight="500" color="$gray11">
                          {item.label}
                        </Text>
                      </XStack>
                    </Pressable>
                  </Link>
                ))}
              </YStack>

              <Link href="/signin" asChild>
                <Pressable onPress={() => setOpen(false)}>
                  <XStack
                    mt="$1"
                    px="$3"
                    py="$2.5"
                    rounded={8}
                    borderWidth={1}
                    borderColor="$borderColor"
                    justify="center"
                  >
                    <Text fontSize={14} fontWeight="500" color={brandColor as any}>
                      Sign out
                    </Text>
                  </XStack>
                </Pressable>
              </Link>
            </YStack>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}
