import { useState } from 'react'
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Text, XStack, YStack } from 'tamagui'

import { PortalProviders, usePortalChrome } from '@/components/PortalProviders'

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
  const chrome = usePortalChrome()

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
        accessibilityLabel="Close notifications"
        onPress={() => setOpen(false)}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          styles.panel,
          {
            width: panelW,
            backgroundColor: chrome.panelBg,
            borderColor: chrome.panelBorder,
          },
        ]}
      >
        <YStack width="100%" gap="$3">
          <XStack
            items="center"
            justify="space-between"
            pb="$2"
            borderBottomWidth={1}
            borderColor={chrome.panelBorder as any}
          >
            <Text fontSize={18} fontWeight="600" color={chrome.text as any}>
              Notification
            </Text>
            <Pressable onPress={() => setOpen(false)}>
              <Text fontSize={18} color={chrome.muted as any}>
                ✕
              </Text>
            </Pressable>
          </XStack>
          <ScrollView style={{ maxHeight: 380 }} keyboardShouldPersistTaps="handled">
            <YStack gap="$1">
              {NOTES.map((n) => (
                <Pressable key={n.name} onPress={() => setOpen(false)}>
                  <YStack p="$3" rounded={12} gap={6} hoverStyle={{ bg: '$backgroundHover' }}>
                    <Text fontSize={14} color={chrome.muted as any}>
                      <Text fontWeight="600" color={chrome.text as any}>
                        {n.name}{' '}
                      </Text>
                      {n.action}
                    </Text>
                    <Text fontSize={12} color={chrome.muted as any}>
                      {n.meta}
                    </Text>
                  </YStack>
                </Pressable>
              ))}
            </YStack>
          </ScrollView>
        </YStack>
      </View>
    </View>
  )

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
    maxHeight: 480,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    zIndex: 1,
    elevation: 12,
  },
})
