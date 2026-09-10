import { useState } from 'react'
import { Pressable } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { Label } from '@/components/form/Label'
import { AppSelect } from '@/components/form/Select'
import { ComponentCard } from '@/components/ui/ComponentCard'
import { brand } from '@/theme/colors'

const options = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'template', label: 'Template' },
  { value: 'development', label: 'Development' },
]

const multiOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
]

export function SelectInputs() {
  const [selected, setSelected] = useState<string[]>(['1', '3'])

  return (
    <ComponentCard title="Select Inputs">
      <YStack gap="$4">
        <YStack>
          <Label>Select Input</Label>
          <AppSelect options={options} placeholder="Select Option" />
        </YStack>
        <YStack gap="$2">
          <Label>Multiple Select Options</Label>
          <XStack flexWrap="wrap" gap="$2">
            {multiOptions.map((opt) => {
              const active = selected.includes(opt.value)
              return (
                <Pressable
                  key={opt.value}
                  onPress={() =>
                    setSelected((prev) =>
                      active
                        ? prev.filter((v) => v !== opt.value)
                        : [...prev, opt.value]
                    )
                  }
                >
                  <XStack
                    px={12}
                    py={8}
                    rounded={8}
                    borderWidth={1}
                    borderColor={active ? brand[500] : '$borderColor'}
                    bg={active ? '$accentBackground' : '$background'}
                  >
                    <Text
                      fontSize={13}
                      fontWeight="500"
                      color={active ? (brand[500] as any) : '$color'}
                    >
                      {opt.label}
                    </Text>
                  </XStack>
                </Pressable>
              )
            })}
          </XStack>
        </YStack>
      </YStack>
    </ComponentCard>
  )
}
