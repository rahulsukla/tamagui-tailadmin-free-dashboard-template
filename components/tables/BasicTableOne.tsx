import { Image } from 'expo-image'
import type { ImageSource } from 'expo-image'
import { ScrollView, useWindowDimensions } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { Badge } from '@/components/ui/Badge'

type Order = {
  id: number
  user: { image: ImageSource; name: string; role: string }
  projectName: string
  team: ImageSource[]
  status: 'Active' | 'Pending' | 'Cancel'
  budget: string
}

const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: require('@/assets/demo/user/user-a.png'),
      name: 'Alex Kim',
      role: 'Web Designer',
    },
    projectName: 'Agency Website',
    team: [
      require('@/assets/demo/user/user-b.png'),
      require('@/assets/demo/user/user-c.png'),
      require('@/assets/demo/user/user-d.png'),
    ],
    budget: '3.9K',
    status: 'Active',
  },
  {
    id: 2,
    user: {
      image: require('@/assets/demo/user/user-e.png'),
      name: 'Eden Ortiz',
      role: 'Project Manager',
    },
    projectName: 'Technology',
    team: [
      require('@/assets/demo/user/user-f.png'),
      require('@/assets/demo/user/user-g.png'),
    ],
    budget: '24.9K',
    status: 'Pending',
  },
  {
    id: 3,
    user: {
      image: require('@/assets/demo/user/user-h.png'),
      name: 'Omar Diaz',
      role: 'Content Writing',
    },
    projectName: 'Blog Writing',
    team: [require('@/assets/demo/user/user-i.png')],
    budget: '12.7K',
    status: 'Active',
  },
  {
    id: 4,
    user: {
      image: require('@/assets/demo/user/user-j.png'),
      name: 'Quinn Brooks',
      role: 'Digital Marketer',
    },
    projectName: 'Social Media',
    team: [
      require('@/assets/demo/user/user-a.png'),
      require('@/assets/demo/user/user-b.png'),
      require('@/assets/demo/user/user-c.png'),
    ],
    budget: '2.8K',
    status: 'Cancel',
  },
  {
    id: 5,
    user: {
      image: require('@/assets/demo/user/john-doe.png'),
      name: 'John Doe',
      role: 'Product Designer',
    },
    projectName: 'Website',
    team: [
      require('@/assets/demo/user/user-d.png'),
      require('@/assets/demo/user/user-e.png'),
      require('@/assets/demo/user/user-f.png'),
    ],
    budget: '4.5K',
    status: 'Active',
  },
]

function statusColor(status: Order['status']) {
  if (status === 'Active') return 'success' as const
  if (status === 'Pending') return 'warning' as const
  return 'error' as const
}

const COLS = [220, 160, 100, 110, 80] as const
const FLEX = [2.2, 1.6, 1.1, 1, 0.7] as const

export function BasicTableOne() {
  const { width } = useWindowDimensions()
  const compact = width < 900

  return (
    <YStack
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      overflow="hidden"
      width="100%"
    >
      <ScrollView
        horizontal={compact}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <YStack
          width={compact ? COLS.reduce((a, b) => a + b, 0) + 32 : '100%'}
          minW={compact ? undefined : '100%'}
          flex={1}
        >
          <XStack borderBottomWidth={1} borderColor="$borderColor" py={12} px={16}>
            {['User', 'Project Name', 'Team', 'Status', 'Budget'].map((h, i) => (
              <Text
                key={h}
                width={compact ? COLS[i] : undefined}
                flex={compact ? undefined : FLEX[i]}
                px={8}
                fontSize={12}
                fontWeight="500"
                color="$gray10"
                numberOfLines={1}
              >
                {h}
              </Text>
            ))}
          </XStack>
          {tableData.map((row, idx) => (
            <XStack
              key={row.id}
              py={14}
              px={16}
              items="center"
              borderBottomWidth={idx === tableData.length - 1 ? 0 : 1}
              borderColor="$borderColor"
            >
              <XStack
                width={compact ? COLS[0] : undefined}
                flex={compact ? undefined : FLEX[0]}
                px={8}
                items="center"
                gap={12}
                minW={0}
              >
                <Image
                  source={row.user.image}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                  contentFit="cover"
                />
                <YStack flex={1} minW={0}>
                  <Text fontSize={14} fontWeight="500" color="$color" numberOfLines={1}>
                    {row.user.name}
                  </Text>
                  <Text fontSize={12} color="$gray10" numberOfLines={1}>
                    {row.user.role}
                  </Text>
                </YStack>
              </XStack>
              <Text
                width={compact ? COLS[1] : undefined}
                flex={compact ? undefined : FLEX[1]}
                px={8}
                fontSize={14}
                color="$gray11"
                numberOfLines={1}
                minW={0}
              >
                {row.projectName}
              </Text>
              <XStack
                width={compact ? COLS[2] : undefined}
                flex={compact ? undefined : FLEX[2]}
                px={8}
                items="center"
                minW={0}
              >
                {row.team.map((src, i) => (
                  <Image
                    key={i}
                    source={src}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      marginLeft: i === 0 ? 0 : -8,
                      borderWidth: 2,
                      borderColor: '#fff',
                    }}
                    contentFit="cover"
                  />
                ))}
              </XStack>
              <XStack
                width={compact ? COLS[3] : undefined}
                flex={compact ? undefined : FLEX[3]}
                px={8}
                minW={0}
              >
                <Badge size="sm" color={statusColor(row.status)}>
                  {row.status}
                </Badge>
              </XStack>
              <Text
                width={compact ? COLS[4] : undefined}
                flex={compact ? undefined : FLEX[4]}
                px={8}
                fontSize={14}
                color="$gray11"
                numberOfLines={1}
                minW={0}
              >
                {row.budget}
              </Text>
            </XStack>
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
