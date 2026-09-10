import { useState } from 'react'
import { Pressable } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { gray } from '@/theme/colors'
import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { useThemeMode } from '@/context/ThemeContext'

type SwitchProps = {
  label: string
  defaultChecked?: boolean
  disabled?: boolean
  color?: 'blue' | 'gray'
  onChange?: (checked: boolean) => void
}

export function Switch({
  label,
  defaultChecked = false,
  disabled,
  color = 'blue',
  onChange,
}: SwitchProps) {
  const [checked, setChecked] = useState(defaultChecked)
  const { resolvedTheme } = useThemeMode()
  const { brandColor } = useTemplateConfig()

  const trackOn =
    color === 'blue'
      ? brandColor
      : resolvedTheme === 'dark'
        ? 'rgba(255,255,255,0.1)'
        : gray[800]
  const trackOff =
    resolvedTheme === 'dark' ? 'rgba(255,255,255,0.1)' : gray[200]

  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        const next = !checked
        setChecked(next)
        onChange?.(next)
      }}
      style={{ opacity: disabled ? 0.55 : 1 }}
    >
      <XStack items="center" gap="$3">
        <YStack
          width={44}
          height={24}
          rounded={999}
          bg={checked ? (trackOn as any) : (trackOff as any)}
          justify="center"
          px={2}
        >
          <YStack
            width={20}
            height={20}
            rounded={999}
            bg="#fff"
            self={checked ? 'flex-end' : 'flex-start'}
          />
        </YStack>
        <Text fontSize={14} fontWeight="500" color="$gray11">
          {label}
        </Text>
      </XStack>
    </Pressable>
  )
}
