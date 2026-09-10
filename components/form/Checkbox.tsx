import { Pressable } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Text, XStack, YStack } from 'tamagui'

import { useTemplateConfig } from '@/context/TemplateConfigContext'

type CheckboxProps = {
  label?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function Checkbox({ label, checked, onChange, disabled }: CheckboxProps) {
  const { brandColor } = useTemplateConfig()

  return (
    <Pressable
      disabled={disabled}
      onPress={() => onChange(!checked)}
      style={{ opacity: disabled ? 0.55 : 1 }}
    >
      <XStack items="center" gap="$3">
        <YStack
          width={20}
          height={20}
          rounded={6}
          borderWidth={1}
          borderColor={checked ? (brandColor as any) : '$borderColor'}
          bg={checked ? (brandColor as any) : 'transparent'}
          items="center"
          justify="center"
        >
          {checked ? (
            <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <Path
                d="M11.67 3.5 5.25 9.92 2.33 7"
                stroke="#fff"
                strokeWidth={1.9}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          ) : null}
        </YStack>
        {label ? (
          <Text fontSize={14} fontWeight="500" color="$color">
            {label}
          </Text>
        ) : null}
      </XStack>
    </Pressable>
  )
}
