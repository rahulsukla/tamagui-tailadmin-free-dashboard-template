import { useState, type ReactNode } from 'react'
import { Modal, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { PortalProviders, usePortalChrome } from '@/components/PortalProviders'
import { AppButton } from '@/components/ui/Button'

export function useModal(initial = false) {
  const [isOpen, setIsOpen] = useState(initial)
  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
  }
}

/**
 * Web: fixed overlay stays under the root Tamagui tree (theme CSS works).
 * Native: RN Modal + PortalProviders (font/theme remount).
 */
export function AppModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  onSave,
  saveLabel = 'Save Changes',
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
  onSave?: () => void
  saveLabel?: string
}) {
  const chrome = usePortalChrome()

  if (!isOpen) return null

  const body = (
    <View
      style={[
        styles.overlay,
        {
          backgroundColor: chrome.overlayDim,
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
        accessibilityLabel="Close dialog"
        onPress={onClose}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          styles.panel,
          {
            backgroundColor: chrome.panelBg,
            borderColor: chrome.panelBorder,
          },
        ]}
      >
        <YStack gap="$4" width="100%">
          <YStack gap="$2">
            <Text fontSize={22} fontWeight="600" color={chrome.text as any}>
              {title}
            </Text>
            {subtitle ? (
              <Text fontSize={14} color={chrome.muted as any}>
                {subtitle}
              </Text>
            ) : null}
          </YStack>
          <ScrollView
            style={{ maxHeight: 420 }}
            contentContainerStyle={{ paddingBottom: 8 }}
            keyboardShouldPersistTaps="handled"
          >
            <YStack gap="$4">{children}</YStack>
          </ScrollView>
              <XStack gap="$3" justify="flex-end" flexWrap="wrap" pt="$3">
            <AppButton variant="outline" size="sm" onPress={onClose}>
              Close
            </AppButton>
            <AppButton
              variant="primary"
              size="sm"
              onPress={() => {
                onSave?.()
                onClose()
              }}
            >
              {saveLabel}
            </AppButton>
          </XStack>
        </YStack>
      </View>
    </View>
  )

  if (Platform.OS === 'web') {
    return body
  }

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <PortalProviders>{body}</PortalProviders>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  panel: {
    width: '100%',
    maxWidth: 700,
    maxHeight: '90%',
    borderWidth: 1,
    borderRadius: 24,
    padding: 24,
    zIndex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
})

export function EditPillButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <XStack
        items="center"
        justify="center"
        gap="$2"
        px={16}
        py={12}
        rounded={999}
        borderWidth={1}
        borderColor="$borderColor"
        bg="$backgroundStrong"
        hoverStyle={{ bg: '$backgroundHover' }}
      >
        <Text fontSize={14} fontWeight="500" color="$gray11">
          ✎ Edit
        </Text>
      </XStack>
    </Pressable>
  )
}

export function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <YStack gap={6} flex={1} minW={0}>
      <Text fontSize={12} color="$gray10" numberOfLines={1}>
        {label}
      </Text>
      <Text fontSize={14} fontWeight="500" color="$color" numberOfLines={2}>
        {value}
      </Text>
    </YStack>
  )
}
