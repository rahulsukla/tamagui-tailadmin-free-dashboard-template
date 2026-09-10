import { Pressable } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { brand } from '@/theme/colors'

type RadioProps = {
  label: string
  checked: boolean
  onChange: () => void
  disabled?: boolean
}

export function Radio({ label, checked, onChange, disabled }: RadioProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onChange}
      style={{ opacity: disabled ? 0.55 : 1 }}
    >
      <XStack items="center" gap="$3">
        <YStack
          width={20}
          height={20}
          rounded={999}
          borderWidth={1.25}
          borderColor={checked ? brand[500] : '$borderColor'}
          bg={checked ? brand[500] : 'transparent'}
          items="center"
          justify="center"
        >
          {checked ? (
            <YStack width={8} height={8} rounded={999} bg="#fff" />
          ) : null}
        </YStack>
        <Text
          fontSize={14}
          fontWeight="500"
          color={disabled ? '$gray8' : '$gray11'}
        >
          {label}
        </Text>
      </XStack>
    </Pressable>
  )
}
