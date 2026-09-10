import { useWindowDimensions } from 'react-native'
import { XStack, YStack } from 'tamagui'

import { DemographicCard } from '@/components/ecommerce/DemographicCard'
import { EcommerceMetrics } from '@/components/ecommerce/EcommerceMetrics'
import { MonthlySalesChart } from '@/components/ecommerce/MonthlySalesChart'
import { MonthlyTarget } from '@/components/ecommerce/MonthlyTarget'
import { RecentOrders } from '@/components/ecommerce/RecentOrders'
import { StatisticsChart } from '@/components/ecommerce/StatisticsChart'

export default function HomeScreen() {
  const { width } = useWindowDimensions()
  const xl = width >= 1280

  return (
    <YStack gap="$4" flex={1}>
      <XStack flexWrap="wrap" gap="$4">
        <YStack width={xl ? '58%' : '100%'} gap="$4" grow={1}>
          <EcommerceMetrics />
          <MonthlySalesChart />
        </YStack>
        <YStack width={xl ? '38%' : '100%'} grow={1}>
          <MonthlyTarget />
        </YStack>
      </XStack>

      <StatisticsChart />

      <XStack flexWrap="wrap" gap="$4">
        <YStack width={xl ? '38%' : '100%'} grow={1}>
          <DemographicCard />
        </YStack>
        <YStack width={xl ? '58%' : '100%'} grow={1}>
          <RecentOrders />
        </YStack>
      </XStack>
    </YStack>
  )
}
