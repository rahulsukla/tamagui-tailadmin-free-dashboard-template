import { useState } from 'react'
import { Pressable } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { brand } from '@/theme/colors'

export type SelectOption = { value: string; label: string }

type AppSelectProps = {
  options: SelectOption[]
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export function AppSelect({
  options,
  placeholder = 'Select an option',
  value,
  defaultValue = '',
  onChange,
}: AppSelectProps) {
  const [open, setOpen] = useState(false)
  const [internal, setInternal] = useState(defaultValue)
  const selected = value ?? internal
  const label = options.find((o) => o.value === selected)?.label

  return (
    <YStack width="100%" position="relative" z={open ? 20 : 1}>
      <Pressable onPress={() => setOpen((v) => !v)}>
        <XStack
          height={44}
          width="100%"
          items="center"
          justify="space-between"
          px={16}
          rounded={8}
          borderWidth={1}
          borderColor="$borderColor"
          bg="$background"
        >
          <Text fontSize={14} color={label ? '$color' : '$placeholderColor'}>
            {label ?? placeholder}
          </Text>
          <Text color="$gray10">{open ? '▴' : '▾'}</Text>
        </XStack>
      </Pressable>
      {open ? (
        <YStack
          position="absolute"
          t={48}
          l={0}
          r={0}
          rounded={8}
          borderWidth={1}
          borderColor="$borderColor"
          bg="$backgroundStrong"
          overflow="hidden"
          z={30}
          elevation={4}
        >
          {options.map((option) => {
            const active = option.value === selected
            return (
              <Pressable
                key={option.value}
                onPress={() => {
                  setInternal(option.value)
                  onChange?.(option.value)
                  setOpen(false)
                }}
              >
                <XStack
                  px={16}
                  py={12}
                  bg={active ? '$accentBackground' : 'transparent'}
                  hoverStyle={{ bg: '$backgroundHover' }}
                >
                  <Text
                    fontSize={14}
                    color={active ? (brand[500] as any) : '$color'}
                    fontWeight={active ? '600' : '400'}
                  >
                    {option.label}
                  </Text>
                </XStack>
              </Pressable>
            )
          })}
        </YStack>
      ) : null}
    </YStack>
  )
}
