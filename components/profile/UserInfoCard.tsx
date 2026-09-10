import { useWindowDimensions } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { AppInput } from '@/components/form/Input'
import { Label } from '@/components/form/Label'
import {
  AppModal,
  EditPillButton,
  ProfileField,
  useModal,
} from '@/components/profile/shared'

export function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal()
  const { width } = useWindowDimensions()
  const stacked = width < 1024

  return (
    <>
      <YStack p="$5" borderWidth={1} borderColor="$borderColor" rounded={16}>
        <XStack
          flexDirection={stacked ? 'column' : 'row'}
          justify="space-between"
          gap="$4"
          items={stacked ? 'stretch' : 'flex-start'}
        >
          <YStack flex={1} gap="$4">
            <Text fontSize={18} fontWeight="600" color="$color">
              Personal Information
            </Text>
            <XStack flexWrap="wrap" gap="$5">
              <ProfileField label="First Name" value="John" />
              <ProfileField label="Last Name" value="Doe" />
              <ProfileField label="Email address" value="john.doe@example.com" />
              <ProfileField label="Phone" value="+1 (555) 010-2030" />
              <ProfileField label="Bio" value="Product Designer" />
            </XStack>
          </YStack>
          <EditPillButton onPress={openModal} />
        </XStack>
      </YStack>

      <AppModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Edit Personal Information"
        subtitle="Update your details to keep your profile up-to-date."
      >
        <XStack flexWrap="wrap" gap="$3">
          <YStack flex={1} minW={200}>
            <Label>First Name</Label>
            <AppInput defaultValue="John" />
          </YStack>
          <YStack flex={1} minW={200}>
            <Label>Last Name</Label>
            <AppInput defaultValue="Doe" />
          </YStack>
          <YStack flex={1} minW={200}>
            <Label>Email</Label>
            <AppInput defaultValue="john.doe@example.com" />
          </YStack>
          <YStack flex={1} minW={200}>
            <Label>Phone</Label>
            <AppInput defaultValue="+1 (555) 010-2030" />
          </YStack>
          <YStack width="100%">
            <Label>Bio</Label>
            <AppInput defaultValue="Product Designer" />
          </YStack>
        </XStack>
      </AppModal>
    </>
  )
}
