import { useWindowDimensions } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { ChartTab } from '@/components/charts/ChartTab'
import { SimpleAreaChart } from '@/components/charts/SimpleAreaChart'
import { useTemplateConfig } from '@/context/TemplateConfigContext'

export function StatisticsChart() {
  const { width } = useWindowDimensions()
  const stacked = width < 640
  const { brandColor } = useTemplateConfig()
  const series = [
    {
      name: 'Sales',
      data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
      color: brandColor,
    },
    {
      name: 'Revenue',
      data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
      color: `${brandColor}99`,
    },
  ]

  return (
    <YStack
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      px="$5"
      pt="$5"
      pb="$5"
      overflow="hidden"
    >
      <XStack
        flexDirection={stacked ? 'column' : 'row'}
        justify="space-between"
        gap="$4"
        mb="$4"
      >
        <YStack gap={4} flex={1}>
          <Text fontSize={18} fontWeight="600" color="$color">
            Statistics
          </Text>
          <Text fontSize={14} color="$gray10">
            Target you&apos;ve set for each month
          </Text>
        </YStack>
        <XStack items="center" gap="$3" flexWrap="wrap">
          <ChartTab />
          <XStack
            height={40}
            px="$3"
            items="center"
            gap="$2"
            rounded={8}
            borderWidth={1}
            borderColor="$borderColor"
            bg="$background"
          >
            <Text color="$gray10">📅</Text>
            <Text fontSize={13} color="$gray11" fontWeight="500">
              Last 7 days
            </Text>
          </XStack>
        </XStack>
      </XStack>
      <SimpleAreaChart series={series} height={310} />
    </YStack>
  )
}
