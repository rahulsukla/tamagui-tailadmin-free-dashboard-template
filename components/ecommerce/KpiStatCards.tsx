import { Text, XStack, YStack } from 'tamagui'

import { useTemplateConfig } from '@/context/TemplateConfigContext'

type Kpi = {
  label: string
  value: string
  delta: string
  positive: boolean
  hint: string
}

const KPIS: Kpi[] = [
  {
    label: 'Total Revenue',
    value: '$1,250.00',
    delta: '+12.5%',
    positive: true,
    hint: 'Trending up this month',
  },
  {
    label: 'New Customers',
    value: '1,234',
    delta: '-20%',
    positive: false,
    hint: 'Acquisition needs attention',
  },
  {
    label: 'Active Accounts',
    value: '45,678',
    delta: '+12.5%',
    positive: true,
    hint: 'Strong user retention',
  },
  {
    label: 'Growth Rate',
    value: '4.5%',
    delta: '+4.5%',
    positive: true,
    hint: 'Steady performance',
  },
]

/** Compact KPI strip inspired by tweakcn Light Green dashboard cards. */
export function KpiStatCards() {
  const { brandColor } = useTemplateConfig()

  return (
    <XStack flexWrap="wrap" gap={16} width="100%">
      {KPIS.map((kpi) => (
        <YStack
          key={kpi.label}
          flex={1}
          minW={200}
          rounded={16}
          borderWidth={1}
          borderColor="$borderColor"
          bg="$backgroundStrong"
          p={20}
          gap={10}
        >
          <Text fontSize={14} color="$gray10">
            {kpi.label}
          </Text>
          <XStack items="flex-end" justify="space-between" gap={8}>
            <Text fontSize={28} fontWeight="700" color="$color" letterSpacing={-0.4}>
              {kpi.value}
            </Text>
            <Text
              fontSize={13}
              fontWeight="600"
              color={(kpi.positive ? brandColor : '#f04438') as any}
            >
              {kpi.delta}
            </Text>
          </XStack>
          <Text fontSize={12} color="$gray10">
            {kpi.hint}
          </Text>
        </YStack>
      ))}
    </XStack>
  )
}
