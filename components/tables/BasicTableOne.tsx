import { Image } from 'expo-image'
import type { ImageSource } from 'expo-image'
import { ScrollView } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { Badge } from '@/components/ui/Badge'
import { useThemeMode } from '@/context/ThemeContext'

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
      image: require('@/assets/demo/user/user-17.jpg'),
      name: 'Lindsey Curtis',
      role: 'Web Designer',
    },
    projectName: 'Agency Website',
    team: [
      require('@/assets/demo/user/user-22.jpg'),
      require('@/assets/demo/user/user-23.jpg'),
      require('@/assets/demo/user/user-24.jpg'),
    ],
    budget: '3.9K',
    status: 'Active',
  },
  {
    id: 2,
    user: {
      image: require('@/assets/demo/user/user-18.jpg'),
      name: 'Kaiya George',
      role: 'Project Manager',
    },
    projectName: 'Technology',
    team: [
      require('@/assets/demo/user/user-25.jpg'),
      require('@/assets/demo/user/user-26.jpg'),
    ],
    budget: '24.9K',
    status: 'Pending',
  },
  {
    id: 3,
    user: {
      image: require('@/assets/demo/user/user-17.jpg'),
      name: 'Zain Geidt',
      role: 'Content Writing',
    },
    projectName: 'Blog Writing',
    team: [require('@/assets/demo/user/user-27.jpg')],
    budget: '12.7K',
    status: 'Active',
  },
  {
    id: 4,
    user: {
      image: require('@/assets/demo/user/user-20.jpg'),
      name: 'Abram Schleifer',
      role: 'Digital Marketer',
    },
    projectName: 'Social Media',
    team: [
      require('@/assets/demo/user/user-28.jpg'),
      require('@/assets/demo/user/user-29.jpg'),
      require('@/assets/demo/user/user-30.jpg'),
    ],
    budget: '2.8K',
    status: 'Cancel',
  },
  {
    id: 5,
    user: {
      image: require('@/assets/demo/user/user-21.jpg'),
      name: 'Carla George',
      role: 'Front-end Developer',
    },
    projectName: 'Website',
    team: [
      require('@/assets/demo/user/user-31.jpg'),
      require('@/assets/demo/user/user-32.jpg'),
      require('@/assets/demo/user/user-33.jpg'),
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

const COLS = [220, 150, 120, 110, 90] as const

export function BasicTableOne() {
  const { resolvedTheme } = useThemeMode()
  const teamBorder = resolvedTheme === 'dark' ? '#101828' : '#fff'

  return (
    <YStack
      overflow="hidden"
      rounded={12}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <YStack minW={COLS.reduce((a, b) => a + b, 0)}>
          <XStack
            borderBottomWidth={1}
            borderColor="$borderColor"
            px="$2"
            py="$3"
            bg="$background"
          >
            {['User', 'Project Name', 'Team', 'Status', 'Budget'].map((h, i) => (
              <Text
                key={h}
                width={COLS[i]}
                px="$3"
                fontSize={12}
                fontWeight="500"
                color="$gray10"
              >
                {h}
              </Text>
            ))}
          </XStack>

          {tableData.map((order, idx) => (
            <XStack
              key={order.id}
              px="$2"
              py="$3"
              items="center"
              borderBottomWidth={idx === tableData.length - 1 ? 0 : 1}
              borderColor="$borderColor"
            >
              <XStack width={COLS[0]} px="$3" items="center" gap="$3">
                <Image
                  source={order.user.image}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                  contentFit="cover"
                />
                <YStack>
                  <Text fontSize={14} fontWeight="500" color="$color">
                    {order.user.name}
                  </Text>
                  <Text fontSize={12} color="$gray10">
                    {order.user.role}
                  </Text>
                </YStack>
              </XStack>

              <Text width={COLS[1]} px="$3" fontSize={14} color="$gray10">
                {order.projectName}
              </Text>

              <XStack width={COLS[2]} px="$3" items="center">
                {order.team.map((src, i) => (
                  <Image
                    key={i}
                    source={src}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      marginLeft: i === 0 ? 0 : -8,
                      borderWidth: 2,
                      borderColor: teamBorder,
                    }}
                    contentFit="cover"
                  />
                ))}
              </XStack>

              <XStack width={COLS[3]} px="$3">
                <Badge size="sm" color={statusColor(order.status)}>
                  {order.status}
                </Badge>
              </XStack>

              <Text width={COLS[4]} px="$3" fontSize={14} color="$gray10">
                {order.budget}
              </Text>
            </XStack>
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
