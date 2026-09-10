import { useState } from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Modal, Pressable, useWindowDimensions } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { PortalProviders } from '@/components/PortalProviders'
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
  const router = useRouter()
  const showName = width >= 640

  return (
    <>
      <Pressable onPress={() => setOpen(true)} accessibilityLabel="User menu">
        <XStack items="center" gap={10}>
          <Image
            source={require('@/assets/demo/user/john-doe.png')}
            style={{ width: 44, height: 44, borderRadius: 22 }}
            contentFit="cover"
          />
          {showName ? (
            <Text fontSize={14} fontWeight="500" color="$gray11" lineHeight={18}>
              John Doe
            </Text>
          ) : null}
          <Text fontSize={12} color="$gray10" lineHeight={18}>
            ▾
          </Text>
        </XStack>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <PortalProviders>
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
                width={280}
                bg="$backgroundStrong"
                borderWidth={1}
                borderColor="$borderColor"
                rounded={16}
                p={16}
                gap={12}
              >
                <YStack gap={4} pb={12} borderBottomWidth={1} borderColor="$borderColor">
                  <Text fontSize={14} fontWeight="600" color="$color" lineHeight={20}>
                    John Doe
                  </Text>
                  <Text fontSize={12} color="$gray10" lineHeight={18}>
                    john.doe@example.com
                  </Text>
                </YStack>

                <YStack gap={4}>
                  {LINKS.map((item) => (
                    <Pressable
                      key={item.label}
                      onPress={() => {
                        setOpen(false)
                        router.push(item.href)
                      }}
                    >
                      <XStack
                        width="100%"
                        px={12}
                        py={10}
                        rounded={8}
                        items="center"
                        hoverStyle={{ bg: '$backgroundHover' }}
                      >
                        <Text fontSize={14} fontWeight="500" color="$gray11" lineHeight={20}>
                          {item.label}
                        </Text>
                      </XStack>
                    </Pressable>
                  ))}
                </YStack>

                <Pressable
                  onPress={() => {
                    setOpen(false)
                    router.push('/signin')
                  }}
                >
                  <XStack
                    width="100%"
                    mt={4}
                    px={12}
                    py={10}
                    rounded={8}
                    borderWidth={1}
                    borderColor="$borderColor"
                    items="center"
                    justify="center"
                  >
                    <Text
                      fontSize={14}
                      fontWeight="500"
                      color={brandColor as any}
                      lineHeight={20}
                      text="center"
                    >
                      Sign out
                    </Text>
                  </XStack>
                </Pressable>
              </YStack>
            </Pressable>
          </Pressable>
        </PortalProviders>
      </Modal>
    </>
  )
}
