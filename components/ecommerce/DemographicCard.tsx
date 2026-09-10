import { Text, XStack, YStack } from 'tamagui'

import { MoreMenu } from '@/components/charts/MoreMenu'
import { brand } from '@/theme/colors'

const countries = [
  { name: 'USA', customers: '2,379 Customers', pct: 79, flag: '🇺🇸' },
  { name: 'France', customers: '589 Customers', pct: 23, flag: '🇫🇷' },
]

export function DemographicCard() {
  return (
    <YStack
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      p="$5"
      gap="$5"
      flex={1}
    >
      <XStack justify="space-between" items="flex-start">
        <YStack gap={4} flex={1}>
          <Text fontSize={18} fontWeight="600" color="$color">
            Customers Demographic
          </Text>
          <Text fontSize={14} color="$gray10">
            Number of customer based on country
          </Text>
        </YStack>
        <MoreMenu />
      </XStack>

      <YStack
        borderWidth={1}
        borderColor="$borderColor"
        rounded={16}
        height={180}
        items="center"
        justify="center"
        bg="$background"
        overflow="hidden"
      >
        <Text fontSize={48}>🗺️</Text>
        <Text mt="$2" fontSize={13} color="$gray10">
          Map placeholder (jsVectorMap skipped for lean native support)
        </Text>
      </YStack>

      <YStack gap="$4">
        {countries.map((c) => (
          <XStack key={c.name} items="center" justify="space-between" gap="$3">
            <XStack items="center" gap="$3" flex={1}>
              <Text fontSize={22}>{c.flag}</Text>
              <YStack>
                <Text fontSize={14} fontWeight="600" color="$color">
                  {c.name}
                </Text>
                <Text fontSize={12} color="$gray10">
                  {c.customers}
                </Text>
              </YStack>
            </XStack>
            <XStack items="center" gap="$3" width={140}>
              <YStack flex={1} height={8} rounded={4} bg="$gray3" overflow="hidden">
                <YStack
                  height="100%"
                  width={`${c.pct}%`}
                  bg={brand[500] as any}
                  rounded={4}
                />
              </YStack>
              <Text fontSize={13} fontWeight="500" color="$gray11" width={36}>
                {c.pct}%
              </Text>
            </XStack>
          </XStack>
        ))}
      </YStack>
    </YStack>
  )
}
