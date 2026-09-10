import { useState } from 'react'
import { Pressable } from 'react-native'
import { Text, XStack } from 'tamagui'

type Tab = 'Monthly' | 'Quarterly' | 'Annually'

export function ChartTab({
  value,
  onChange,
}: {
  value?: Tab
  onChange?: (tab: Tab) => void
}) {
  const [internal, setInternal] = useState<Tab>('Monthly')
  const selected = value ?? internal

  const set = (tab: Tab) => {
    setInternal(tab)
    onChange?.(tab)
  }

  return (
    <XStack bg="$gray3" rounded={8} p={2} gap={2}>
      {(['Monthly', 'Quarterly', 'Annually'] as Tab[]).map((tab) => {
        const active = selected === tab
        return (
          <Pressable key={tab} onPress={() => set(tab)}>
            <XStack
              px={12}
              py={8}
              rounded={6}
              bg={active ? '$backgroundStrong' : 'transparent'}
            >
              <Text
                fontSize={14}
                fontWeight="500"
                color={active ? '$color' : '$gray10'}
              >
                {tab}
              </Text>
            </XStack>
          </Pressable>
        )
      })}
    </XStack>
  )
}
