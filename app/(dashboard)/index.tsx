import { Text, XStack, YStack } from 'tamagui'

import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { brand } from '@/theme/colors'

function MetricCard({
  label,
  value,
  delta,
  positive,
}: {
  label: string
  value: string
  delta: string
  positive?: boolean
}) {
  return (
    <YStack
      flex={1}
      minW={160}
      bg="$backgroundStrong"
      borderWidth={1}
      borderColor="$borderColor"
      rounded={12}
      p="$4"
      gap="$2"
    >
      <Text fontSize={14} color="$gray10">
        {label}
      </Text>
      <XStack items="flex-end" justify="space-between" gap="$2">
        <Text fontSize={28} fontWeight="700" color="$color" letterSpacing={-0.5}>
          {value}
        </Text>
        <Text fontSize={12} fontWeight="600" color={positive ? '$green10' : '$red10'}>
          {delta}
        </Text>
      </XStack>
    </YStack>
  )
}

export default function HomeScreen() {
  return (
    <YStack gap="$5" flex={1}>
      <PageBreadcrumb pageTitle="Ecommerce" />
      <XStack flexWrap="wrap" gap="$4">
        <MetricCard label="Customers" value="3,782" delta="+11.01%" positive />
        <MetricCard label="Orders" value="5,359" delta="-9.05%" />
        <MetricCard label="Revenue" value="$45.2k" delta="+8.12%" positive />
      </XStack>
      <YStack
        bg="$backgroundStrong"
        borderWidth={1}
        borderColor="$borderColor"
        rounded={12}
        p="$5"
        gap="$3"
        minH={280}
      >
        <Text fontSize={18} fontWeight="600" color="$color">
          Monthly Sales
        </Text>
        <Text fontSize={14} color="$gray10">
          Chart widgets land in Phase 4. Layout, theme tokens, and shell match TailAdmin free.
        </Text>
        <YStack
          flex={1}
          minH={180}
          rounded={8}
          bg="$blue2"
          items="center"
          justify="center"
          borderWidth={1}
          borderColor="$blue4"
        >
          <Text color={brand[500]} fontWeight="600">
            Apex / native chart adapters coming next
          </Text>
        </YStack>
      </YStack>
    </YStack>
  )
}
