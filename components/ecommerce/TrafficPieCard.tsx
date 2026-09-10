import { Text, XStack, YStack } from 'tamagui'

import { MoreMenu } from '@/components/charts/MoreMenu'
import { SimplePieChart } from '@/components/charts/SimplePieChart'

const SLICES = [
  { label: 'Desktop', value: 48 },
  { label: 'Mobile', value: 32 },
  { label: 'Tablet', value: 14 },
  { label: 'Other', value: 6 },
]

export function TrafficPieCard() {
  return (
    <YStack
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      p={20}
      gap={16}
      flex={1}
      minH={420}
      width="100%"
    >
      <XStack justify="space-between" items="flex-start" gap={12}>
        <YStack gap={4} flex={1} minW={0}>
          <Text fontSize={18} fontWeight="600" color="$color">
            Traffic by device
          </Text>
          <Text fontSize={14} color="$gray10">
            Sessions split across devices this month
          </Text>
        </YStack>
        <MoreMenu />
      </XStack>
      <SimplePieChart data={SLICES} size={220} />
    </YStack>
  )
}
