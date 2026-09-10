import { useState } from 'react'
import { Modal, Pressable, ScrollView, useWindowDimensions } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Text, XStack, YStack } from 'tamagui'

import { PortalProviders } from '@/components/PortalProviders'

const NOTES = [
  {
    name: 'Terry Franci',
    action: 'requests permission to change Project - Nganter App',
    meta: 'Project · 5 min ago',
  },
  {
    name: 'Alena Franci',
    action: 'requests permission to change Project - Nganter App',
    meta: 'Project · 8 min ago',
  },
  {
    name: 'Jocelyn Kenter',
    action: 'requests permission to change Project - Nganter App',
    meta: 'Project · 15 min ago',
  },
  {
    name: 'Brandon Philips',
    action: 'requests permission to change Project - Nganter App',
    meta: 'Project · 1 hr ago',
  },
]

function BellIcon({ color = '#667085' }: { color?: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10.75 2.292C10.75 1.878 10.414 1.542 10 1.542c-.414 0-.75.336-.75.75v.544C6.083 3.207 3.625 5.9 3.625 9.167v5.292H3.333a.75.75 0 0 0 0 1.5h1.042H15.625h1.042a.75.75 0 0 0 0-1.5h-.292V9.167c0-3.267-2.458-5.96-5.625-6.331V2.292ZM14.875 14.459V9.167a4.875 4.875 0 1 0-9.75 0v5.292h9.75ZM8 17.708c0 .415.336.75.75.75h2.5a.75.75 0 0 0 0-1.5h-2.5a.75.75 0 0 0-.75.75Z"
        fill={color}
      />
    </Svg>
  )
}

export function NotificationDropdown() {
  const [open, setOpen] = useState(false)
  const [notifying, setNotifying] = useState(true)
  const { width } = useWindowDimensions()
  const panelW = Math.min(360, width - 24)

  return (
    <>
      <Pressable
        onPress={() => {
          setOpen(true)
          setNotifying(false)
        }}
        accessibilityLabel="Notifications"
      >
        <XStack
          width={44}
          height={44}
          rounded={999}
          borderWidth={1}
          borderColor="$borderColor"
          bg="$backgroundStrong"
          items="center"
          justify="center"
          position="relative"
        >
          <BellIcon />
          {notifying ? (
            <YStack
              position="absolute"
              t={8}
              r={10}
              width={8}
              height={8}
              rounded={999}
              bg="#fdb022"
            />
          ) : null}
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
                width={panelW}
                maxH={480}
                bg="$backgroundStrong"
                borderWidth={1}
                borderColor="$borderColor"
                rounded={16}
                p="$3"
                gap="$3"
              >
                <XStack items="center" justify="space-between" pb="$2" borderBottomWidth={1} borderColor="$borderColor">
                  <Text fontSize={18} fontWeight="600" color="$color">
                    Notification
                  </Text>
                  <Pressable onPress={() => setOpen(false)}>
                    <Text fontSize={18} color="$gray10">
                      ✕
                    </Text>
                  </Pressable>
                </XStack>
                <ScrollView style={{ maxHeight: 380 }}>
                  <YStack gap="$1">
                    {NOTES.map((n) => (
                      <Pressable key={n.name} onPress={() => setOpen(false)}>
                        <YStack
                          p="$3"
                          rounded={12}
                          gap={6}
                          hoverStyle={{ bg: '$backgroundHover' }}
                        >
                          <Text fontSize={14} color="$gray10">
                            <Text fontWeight="600" color="$color">
                              {n.name}{' '}
                            </Text>
                            {n.action}
                          </Text>
                          <Text fontSize={12} color="$gray8">
                            {n.meta}
                          </Text>
                        </YStack>
                      </Pressable>
                    ))}
                  </YStack>
                </ScrollView>
              </YStack>
            </Pressable>
          </Pressable>
        </PortalProviders>
      </Modal>
    </>
  )
}
