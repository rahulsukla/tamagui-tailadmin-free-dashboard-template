import type { ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Text, XStack, YStack } from 'tamagui'

import { Badge } from '@/components/ui/Badge'

function MetricIcon({ kind }: { kind: 'users' | 'orders' }) {
  return (
    <YStack
      width={48}
      height={48}
      rounded={12}
      bg="$gray3"
      items="center"
      justify="center"
    >
      <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
        {kind === 'users' ? (
          <Path
            d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4ZM4 20a6 6 0 0 1 12 0M18 8a3 3 0 1 0 0-2M20.5 20a4.5 4.5 0 0 0-3.5-4.3"
            stroke="#344054"
            strokeWidth={1.7}
            strokeLinecap="round"
          />
        ) : (
          <Path
            d="M4 7h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Zm2-3h12l1 3H5l1-3Z"
            stroke="#344054"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </Svg>
    </YStack>
  )
}

function MetricCard({
  kind,
  label,
  value,
  badge,
}: {
  kind: 'users' | 'orders'
  label: string
  value: string
  badge: ReactNode
}) {
  return (
    <YStack
      flex={1}
      minW={240}
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      p={20}
    >
      <MetricIcon kind={kind} />
      <XStack mt={20} items="flex-end" justify="space-between" gap={12}>
        <YStack flex={1} minW={0}>
          <Text fontSize={14} color="$gray10">
            {label}
          </Text>
          <Text mt={8} fontSize={28} fontWeight="700" color="$color" letterSpacing={-0.4}>
            {value}
          </Text>
        </YStack>
        {badge}
      </XStack>
    </YStack>
  )
}

export function EcommerceMetrics() {
  const { width } = useWindowDimensions()
  const two = width >= 640

  return (
    <XStack flexDirection={two ? 'row' : 'column'} gap={16} width="100%">
      <MetricCard
        kind="users"
        label="Customers"
        value="3,782"
        badge={<Badge color="success">↑ 11.01%</Badge>}
      />
      <MetricCard
        kind="orders"
        label="Orders"
        value="5,359"
        badge={<Badge color="error">↓ 9.05%</Badge>}
      />
    </XStack>
  )
}
