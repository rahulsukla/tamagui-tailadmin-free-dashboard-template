import { YStack } from 'tamagui'

import { ChartCardHeader, SimpleBarChart } from '@/components/charts/SimpleBarChart'
import { MoreMenu } from '@/components/charts/MoreMenu'

const sales = [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112]

export function MonthlySalesChart() {
  return (
    <YStack
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      px={20}
      pt={20}
      pb={24}
      overflow="hidden"
    >
      <ChartCardHeader title="Monthly Sales" right={<MoreMenu />} />
      <YStack mt={12}>
        <SimpleBarChart data={sales} height={180} />
      </YStack>
    </YStack>
  )
}
