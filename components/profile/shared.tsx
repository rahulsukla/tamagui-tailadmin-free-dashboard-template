import { useState, type ReactNode } from 'react'
import { Modal, Pressable } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { PortalProviders } from '@/components/PortalProviders'
import { AppButton } from '@/components/ui/Button'

export function useModal(initial = false) {
  const [isOpen, setIsOpen] = useState(initial)
  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
  }
}

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
  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
      <PortalProviders>
        <Pressable
          onPress={onClose}
          style={{
            flex: 1,
            backgroundColor: 'rgba(16,24,40,0.45)',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          {/* Nested Pressable absorbs presses so the backdrop does not close the dialog. */}
          <Pressable onPress={() => {}}>
            <YStack
              bg="$backgroundStrong"
              rounded={24}
              p="$5"
              maxW={700}
              width="100%"
              self="center"
              gap="$4"
              maxH="90%"
            >
              <YStack gap="$2">
                <Text fontSize={22} fontWeight="600" color="$color">
                  {title}
                </Text>
                {subtitle ? (
                  <Text fontSize={14} color="$gray10">
                    {subtitle}
                  </Text>
                ) : null}
              </YStack>
              <YStack gap="$4">{children}</YStack>
              <XStack gap="$3" justify="flex-end" flexWrap="wrap">
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
          </Pressable>
        </Pressable>
      </PortalProviders>
    </Modal>
  )
}

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
    <YStack gap={6} minW={140} flex={1}>
      <Text fontSize={12} color="$gray10">
        {label}
      </Text>
      <Text fontSize={14} fontWeight="500" color="$color">
        {value}
      </Text>
    </YStack>
  )
}
