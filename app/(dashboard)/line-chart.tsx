import { YStack } from 'tamagui'

import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { SimpleAreaChart } from '@/components/charts/SimpleAreaChart'
import { ComponentCard } from '@/components/ui/ComponentCard'
import { brand } from '@/theme/colors'

const series = [
  {
    name: 'Sales',
    data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
    color: brand[500],
  },
  {
    name: 'Revenue',
    data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
    color: brand[300],
  },
]

export default function LineChartPage() {
  return (
    <YStack gap="$5" flex={1}>
      <PageBreadcrumb pageTitle="Line Chart" />
      <ComponentCard title="Line Chart 1">
        <SimpleAreaChart series={series} height={310} />
      </ComponentCard>
    </YStack>
  )
}
