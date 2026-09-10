import { Image } from 'expo-image'
import { Linking, Pressable, useWindowDimensions } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { AppInput } from '@/components/form/Input'
import { Label } from '@/components/form/Label'
import {
  AppModal,
  EditPillButton,
  ProfileField,
  useModal,
} from '@/components/profile/shared'

function SocialButton({ label, href }: { label: string; href: string }) {
  return (
    <Pressable onPress={() => void Linking.openURL(href)}>
      <XStack
        width={44}
        height={44}
        rounded={999}
        borderWidth={1}
        borderColor="$borderColor"
        bg="$backgroundStrong"
        items="center"
        justify="center"
      >
        <Text fontSize={12} fontWeight="700" color="$gray11">
          {label}
        </Text>
      </XStack>
    </Pressable>
  )
}

export function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal()
  const { width } = useWindowDimensions()
  const stacked = width < 1280

  return (
    <>
      <YStack
        p="$5"
        borderWidth={1}
        borderColor="$borderColor"
        rounded={16}
        gap="$4"
      >
        <XStack
          flexDirection={stacked ? 'column' : 'row'}
          items="center"
          justify="space-between"
          gap="$4"
        >
          <XStack
            flexDirection={stacked ? 'column' : 'row'}
            items="center"
            gap="$4"
            flex={1}
          >
            <Image
              source={require('@/assets/demo/user/john-doe.png')}
              style={{ width: 80, height: 80, borderRadius: 40 }}
              contentFit="cover"
            />
            <YStack items={stacked ? 'center' : 'flex-start'} gap="$2">
              <Text fontSize={18} fontWeight="600" color="$color">
                John Doe
              </Text>
              <XStack
                flexDirection={stacked ? 'column' : 'row'}
                items="center"
                gap={stacked ? 4 : 12}
              >
                <Text fontSize={14} color="$gray10">
                  Product Designer
                </Text>
                {!stacked ? <YStack width={1} height={14} bg="$borderColor" /> : null}
                <Text fontSize={14} color="$gray10">
                  Austin, United States
                </Text>
              </XStack>
            </YStack>
          </XStack>

          <XStack items="center" gap="$2" flexWrap="wrap" justify="center">
            <SocialButton label="f" href="https://example.com" />
            <SocialButton label="X" href="https://example.com" />
            <SocialButton label="in" href="https://example.com" />
            <SocialButton label="ig" href="https://example.com" />
            <EditPillButton onPress={openModal} />
          </XStack>
        </XStack>
      </YStack>

      <AppModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Edit personal information"
        subtitle="Update your photo and personal details here."
      >
        <YStack gap="$3">
          <YStack>
            <Label>First Name</Label>
            <AppInput defaultValue="John" />
          </YStack>
          <YStack>
            <Label>Last Name</Label>
            <AppInput defaultValue="Doe" />
          </YStack>
        </YStack>
      </AppModal>
    </>
  )
}
