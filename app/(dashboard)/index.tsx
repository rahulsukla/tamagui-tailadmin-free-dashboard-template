import { useWindowDimensions } from 'react-native'
import { XStack, YStack } from 'tamagui'

import { DemographicCard } from '@/components/ecommerce/DemographicCard'
import { EcommerceMetrics } from '@/components/ecommerce/EcommerceMetrics'
import { MonthlySalesChart } from '@/components/ecommerce/MonthlySalesChart'
import { MonthlyTarget } from '@/components/ecommerce/MonthlyTarget'
import { RecentOrders } from '@/components/ecommerce/RecentOrders'
import { StatisticsChart } from '@/components/ecommerce/StatisticsChart'

/** Mirrors TailAdmin free Home: 12-col grid → 7 / 5 on xl. */
export default function HomeScreen() {
  const { width } = useWindowDimensions()
  const xl = width >= 1280

  return (
    <YStack gap={16} flex={1} width="100%">
      <XStack
        flexDirection={xl ? 'row' : 'column'}
        gap={16}
        width="100%"
        items="stretch"
      >
        <YStack flex={xl ? 7 : undefined} width={xl ? undefined : '100%'} gap={24} minW={0}>
          <EcommerceMetrics />
          <MonthlySalesChart />
        </YStack>
        <YStack flex={xl ? 5 : undefined} width={xl ? undefined : '100%'} minW={0}>
          <MonthlyTarget />
        </YStack>
      </XStack>

      <StatisticsChart />

      <XStack
        flexDirection={xl ? 'row' : 'column'}
        gap={16}
        width="100%"
        items="stretch"
      >
        <YStack flex={xl ? 5 : undefined} width={xl ? undefined : '100%'} minW={0}>
          <DemographicCard />
        </YStack>
        <YStack flex={xl ? 7 : undefined} width={xl ? undefined : '100%'} minW={0}>
          <RecentOrders />
        </YStack>
      </XStack>
    </YStack>
  )
}
