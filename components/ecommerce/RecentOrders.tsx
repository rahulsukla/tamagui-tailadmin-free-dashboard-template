import { Image } from 'expo-image'
import type { ImageSource } from 'expo-image'
import { ScrollView } from 'react-native'
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
    name: 'MacBook Pro 13”',
    variants: '2 Variants',
    category: 'Laptop',
    price: '$2399.00',
    status: 'Delivered',
    image: require('@/assets/demo/product/product-01.jpg'),
  },
  {
    id: 2,
    name: 'Apple Watch Ultra',
    variants: '1 Variant',
    category: 'Watch',
    price: '$879.00',
    status: 'Pending',
    image: require('@/assets/demo/product/product-02.jpg'),
  },
  {
    id: 3,
    name: 'iPhone 15 Pro Max',
    variants: '2 Variants',
    category: 'SmartPhone',
    price: '$1869.00',
    status: 'Delivered',
    image: require('@/assets/demo/product/product-03.jpg'),
  },
  {
    id: 4,
    name: 'iPad Pro 3rd Gen',
    variants: '2 Variants',
    category: 'Electronics',
    price: '$1699.00',
    status: 'Canceled',
    image: require('@/assets/demo/product/product-04.jpg'),
  },
  {
    id: 5,
    name: 'AirPods Pro 2nd Gen',
    variants: '1 Variant',
    category: 'Accessories',
    price: '$240.00',
    status: 'Delivered',
    image: require('@/assets/demo/product/product-05.jpg'),
  },
]

function statusColor(status: Product['status']) {
  if (status === 'Delivered') return 'success' as const
  if (status === 'Pending') return 'warning' as const
  return 'error' as const
}

const COLS = [220, 100, 120, 110, 110] as const

export function RecentOrders() {
  return (
    <YStack
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      px="$4"
      pt="$4"
      pb="$3"
      overflow="hidden"
      flex={1}
    >
      <XStack items="center" justify="space-between" mb="$4" gap="$3" flexWrap="wrap">
        <Text fontSize={18} fontWeight="600" color="$color">
          Recent Orders
        </Text>
        <XStack gap="$2">
          <XStack
            px="$3"
            py="$2"
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
            px="$3"
            py="$2"
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <YStack minW={COLS.reduce((a, b) => a + b, 0)}>
          <XStack borderBottomWidth={1} borderColor="$borderColor" py="$3">
            {['Products', 'Category', 'Price', 'Status', ''].map((h, i) => (
              <Text
                key={`${h}-${i}`}
                width={COLS[i]}
                px="$2"
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
              py="$3"
              items="center"
              borderBottomWidth={idx === tableData.length - 1 ? 0 : 1}
              borderColor="$borderColor"
            >
              <XStack width={COLS[0]} px="$2" items="center" gap="$3">
                <Image
                  source={row.image}
                  style={{ width: 48, height: 48, borderRadius: 8 }}
                  contentFit="cover"
                />
                <YStack flex={1}>
                  <Text fontSize={14} fontWeight="500" color="$color" numberOfLines={1}>
                    {row.name}
                  </Text>
                  <Text fontSize={12} color="$gray10">
                    {row.variants}
                  </Text>
                </YStack>
              </XStack>
              <Text width={COLS[1]} px="$2" fontSize={14} color="$gray10">
                {row.category}
              </Text>
              <Text width={COLS[2]} px="$2" fontSize={14} color="$gray10">
                {row.price}
              </Text>
              <XStack width={COLS[3]} px="$2">
                <Badge size="sm" color={statusColor(row.status)}>
                  {row.status}
                </Badge>
              </XStack>
              <Text width={COLS[4]} px="$2" color="$gray8">
                ⋯
              </Text>
            </XStack>
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
