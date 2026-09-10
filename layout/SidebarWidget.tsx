import { Linking, Pressable } from 'react-native'
import { Text, YStack } from 'tamagui'

import { useTemplateConfig } from '@/context/TemplateConfigContext'

/** Free TailAdmin sidebar promo widget (links to upstream TailAdmin pricing). */
export function SidebarWidget() {
  const { brandColor } = useTemplateConfig()

  return (
    <YStack
      self="center"
      width="100%"
      maxW={240}
      rounded={16}
      bg="$gray3"
      px="$4"
      py="$5"
      items="center"
      gap="$3"
      mb="$6"
    >
      <Text fontSize={14} fontWeight="600" color="$color" text="center">
        #1 Tailwind CSS Dashboard
      </Text>
      <Text fontSize={13} color="$gray10" text="center">
        Leading Tailwind CSS Admin Template with 400+ UI Component and Pages.
      </Text>
      <Pressable onPress={() => void Linking.openURL('https://tailadmin.com/pricing')}>
        <YStack
          width="100%"
          px="$3"
          py="$3"
          rounded={8}
          bg={brandColor as any}
          items="center"
        >
          <Text fontSize={13} fontWeight="500" color="#fff">
            Purchase Plan
          </Text>
        </YStack>
      </Pressable>
    </YStack>
  )
}
