import { useState } from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Modal, Platform, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { PortalProviders, usePortalChrome } from '@/components/PortalProviders'
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
  const chrome = usePortalChrome()
  const router = useRouter()
  const showName = width >= 640

  const panel = (
    <View
      style={[
        styles.overlay,
        {
          backgroundColor: chrome.overlayDimSoft,
          ...(Platform.OS === 'web'
            ? ({
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: 10000,
              } as object)
            : null),
        },
      ]}
    >
      <Pressable
        accessibilityLabel="Close user menu"
        onPress={() => setOpen(false)}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          styles.panel,
          { backgroundColor: chrome.panelBg, borderColor: chrome.panelBorder },
        ]}
      >
        <YStack width="100%" gap={12}>
          <YStack gap={4} pb={12} borderBottomWidth={1} borderColor={chrome.panelBorder as any}>
            <Text fontSize={14} fontWeight="600" color={chrome.text as any} lineHeight={20}>
              John Doe
            </Text>
            <Text fontSize={12} color={chrome.muted as any} lineHeight={18}>
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
                  <Text
                    fontSize={14}
                    fontWeight="500"
                    color={chrome.text as any}
                    lineHeight={20}
                  >
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
              borderColor={chrome.panelBorder as any}
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
      </View>
    </View>
  )

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

      {open ? (
        Platform.OS === 'web' ? (
          panel
        ) : (
          <Modal visible transparent animationType="fade" onRequestClose={() => setOpen(false)}>
            <PortalProviders>{panel}</PortalProviders>
          </Modal>
        )
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 64,
    paddingRight: 12,
  },
  panel: {
    width: 280,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    zIndex: 1,
    elevation: 12,
  },
})
