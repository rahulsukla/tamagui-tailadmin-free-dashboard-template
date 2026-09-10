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

export function UserAddressCard() {
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
              Address
            </Text>
            <XStack flexWrap="wrap" gap="$5">
              <ProfileField label="Country" value="United States." />
              <ProfileField
                label="City/State"
                value="Phoenix, Arizona, United States."
              />
              <ProfileField label="Postal Code" value="ERT 2489" />
              <ProfileField label="TAX ID" value="AS4568384" />
            </XStack>
          </YStack>
          <EditPillButton onPress={openModal} />
        </XStack>
      </YStack>

      <AppModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Edit Address"
        subtitle="Update your address details to keep your profile up-to-date."
      >
        <XStack flexWrap="wrap" gap="$3">
          <YStack flex={1} minW={200}>
            <Label>Country</Label>
            <AppInput defaultValue="United States" />
          </YStack>
          <YStack flex={1} minW={200}>
            <Label>City/State</Label>
            <AppInput defaultValue="Phoenix, Arizona" />
          </YStack>
          <YStack flex={1} minW={200}>
            <Label>Postal Code</Label>
            <AppInput defaultValue="ERT 2489" />
          </YStack>
          <YStack flex={1} minW={200}>
            <Label>TAX ID</Label>
            <AppInput defaultValue="AS4568384" />
          </YStack>
        </XStack>
      </AppModal>
    </>
  )
}
