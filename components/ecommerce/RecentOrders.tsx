import { Image } from 'expo-image'
import type { ImageSource } from 'expo-image'
import { ScrollView, useWindowDimensions } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { Badge } from '@/components/ui/Badge'

type Product = {
  id: number
  name: string
  variants: string
  category: string
  price: string
  status: 'Delivered' | 'Pending' | 'Canceled'
  image: ImageSource
}

const tableData: Product[] = [
  {
    id: 1,
    name: 'Notebook Pro 13”',
    variants: '2 Variants',
    category: 'Laptop',
    price: '$2399.00',
    status: 'Delivered',
    image: require('@/assets/demo/product/product-01.png'),
  },
  {
    id: 2,
    name: 'Sport Watch Ultra',
    variants: '1 Variant',
    category: 'Watch',
    price: '$879.00',
    status: 'Pending',
    image: require('@/assets/demo/product/product-02.png'),
  },
  {
    id: 3,
    name: 'Phone 15 Pro',
    variants: '2 Variants',
    category: 'Phone',
    price: '$1869.00',
    status: 'Delivered',
    image: require('@/assets/demo/product/product-03.png'),
  },
  {
    id: 4,
    name: 'Tablet Pro',
    variants: '2 Variants',
    category: 'Electronics',
    price: '$1699.00',
    status: 'Canceled',
    image: require('@/assets/demo/product/product-04.png'),
  },
  {
    id: 5,
    name: 'Wireless Buds',
    variants: '1 Variant',
    category: 'Accessories',
    price: '$240.00',
    status: 'Delivered',
    image: require('@/assets/demo/product/product-05.png'),
  },
]

function statusColor(status: Product['status']) {
  if (status === 'Delivered') return 'success' as const
  if (status === 'Pending') return 'warning' as const
  return 'error' as const
}

const COLS = [240, 110, 110, 120, 48] as const

export function RecentOrders() {
  const { width } = useWindowDimensions()
  const compact = width < 900

  const tableBody = (
    <YStack
      width={compact ? COLS.reduce((a, b) => a + b, 0) : '100%'}
      minW={compact ? undefined : '100%'}
    >
      <XStack borderBottomWidth={1} borderColor="$borderColor" pb={12}>
        {['Products', 'Category', 'Price', 'Status', ''].map((h, i) => (
          <Text
            key={`${h}-${i}`}
            width={compact ? COLS[i] : undefined}
            flex={compact ? undefined : i === 0 ? 2 : 1}
            px={8}
            fontSize={12}
            fontWeight="500"
            color="$gray10"
          >
            {h}
          </Text>
        ))}
      </XStack>
      {tableData.map((row, idx) => (
        <XStack
          key={row.id}
          py={14}
          items="center"
          borderBottomWidth={idx === tableData.length - 1 ? 0 : 1}
          borderColor="$borderColor"
        >
          <XStack
            width={compact ? COLS[0] : undefined}
            flex={compact ? undefined : 2}
            px={8}
            items="center"
            gap={12}
            minW={0}
          >
            <Image
              source={row.image}
              style={{ width: 48, height: 48, borderRadius: 8 }}
              contentFit="cover"
            />
            <YStack flex={1} minW={0}>
              <Text fontSize={14} fontWeight="500" color="$color" numberOfLines={1}>
                {row.name}
              </Text>
              <Text fontSize={12} color="$gray10">
                {row.variants}
              </Text>
            </YStack>
          </XStack>
          <Text
            width={compact ? COLS[1] : undefined}
            flex={compact ? undefined : 1}
            px={8}
            fontSize={14}
            color="$gray10"
            numberOfLines={1}
            minW={0}
          >
            {row.category}
          </Text>
          <Text
            width={compact ? COLS[2] : undefined}
            flex={compact ? undefined : 1}
            px={8}
            fontSize={14}
            color="$gray10"
            numberOfLines={1}
            minW={0}
          >
            {row.price}
          </Text>
          <XStack
            width={compact ? COLS[3] : undefined}
            flex={compact ? undefined : 1}
            px={8}
            minW={0}
          >
            <Badge size="sm" color={statusColor(row.status)}>
              {row.status}
            </Badge>
          </XStack>
          <Text
            width={compact ? COLS[4] : undefined}
            flex={compact ? undefined : 0.4}
            px={8}
            color="$gray8"
          >
            ⋯
          </Text>
        </XStack>
      ))}
    </YStack>
  )

  return (
    <YStack
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      p={20}
      gap={16}
      flex={1}
      minH={420}
      width="100%"
      minW={0}
      overflow="hidden"
    >
      <XStack items="center" justify="space-between" gap={12} flexWrap="wrap">
        <Text fontSize={18} fontWeight="600" color="$color">
          Recent Orders
        </Text>
        <XStack gap={8}>
          <XStack
            px={12}
            py={8}
            rounded={8}
            borderWidth={1}
            borderColor="$borderColor"
            bg="$background"
          >
            <Text fontSize={13} color="$gray11" fontWeight="500">
              Filter
            </Text>
          </XStack>
          <XStack
            px={12}
            py={8}
            rounded={8}
            borderWidth={1}
            borderColor="$borderColor"
            bg="$background"
          >
            <Text fontSize={13} color="$gray11" fontWeight="500">
              See all
            </Text>
          </XStack>
        </XStack>
      </XStack>

      {/* Avoid nested vertical ScrollView (horizontal={false}) — collapses on web. */}
      {compact ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tableBody}
        </ScrollView>
      ) : (
        tableBody
      )}
    </YStack>
  )
}
