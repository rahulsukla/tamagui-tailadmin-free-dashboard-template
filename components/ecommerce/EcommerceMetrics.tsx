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

export function EcommerceMetrics() {
  const { width } = useWindowDimensions()
  const two = width >= 640

  return (
    <XStack flexWrap="wrap" gap="$4">
      <YStack
        width={two ? '48%' : '100%'}
        grow={1}
        rounded={16}
        borderWidth={1}
        borderColor="$borderColor"
        bg="$backgroundStrong"
        p="$5"
      >
        <MetricIcon kind="users" />
        <XStack mt="$5" items="flex-end" justify="space-between">
          <YStack>
            <Text fontSize={14} color="$gray10">
              Customers
            </Text>
            <Text mt="$2" fontSize={28} fontWeight="700" color="$color" letterSpacing={-0.4}>
              3,782
            </Text>
          </YStack>
          <Badge color="success">↑ 11.01%</Badge>
        </XStack>
      </YStack>

      <YStack
        width={two ? '48%' : '100%'}
        grow={1}
        rounded={16}
        borderWidth={1}
        borderColor="$borderColor"
        bg="$backgroundStrong"
        p="$5"
      >
        <MetricIcon kind="orders" />
        <XStack mt="$5" items="flex-end" justify="space-between">
          <YStack>
            <Text fontSize={14} color="$gray10">
              Orders
            </Text>
            <Text mt="$2" fontSize={28} fontWeight="700" color="$color" letterSpacing={-0.4}>
              5,359
            </Text>
          </YStack>
          <Badge color="error">↓ 9.05%</Badge>
        </XStack>
      </YStack>
    </XStack>
  )
}
