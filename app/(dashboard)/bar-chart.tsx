import { YStack } from 'tamagui'

import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { SimpleBarChart } from '@/components/charts/SimpleBarChart'
import { ComponentCard } from '@/components/ui/ComponentCard'

const sales = [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112]

export default function BarChartPage() {
  return (
    <YStack gap="$5" flex={1}>
      <PageBreadcrumb pageTitle="Bar Chart" />
      <ComponentCard title="Bar Chart 1">
        <SimpleBarChart data={sales} height={200} />
      </ComponentCard>
    </YStack>
  )
}
