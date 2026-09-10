import { Text, XStack, YStack } from 'tamagui'

import { MoreMenu } from '@/components/charts/MoreMenu'
import { RadialProgress } from '@/components/charts/SimpleAreaChart'
import { useContainerWidth } from '@/components/useContainerWidth'
import { success } from '@/theme/colors'

export function MonthlyTarget() {
  const { width, onLayout } = useContainerWidth(280)
  const radialSize = Math.min(240, Math.max(160, width - 48))

  return (
    <YStack
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$gray3"
      overflow="hidden"
      width="100%"
      onLayout={onLayout}
    >
      <YStack px="$5" pt="$5" pb="$6" bg="$backgroundStrong" rounded={16} gap="$2">
        <XStack justify="space-between" items="flex-start" gap={12}>
          <YStack gap={4} flex={1} minW={0}>
            <Text fontSize={18} fontWeight="600" color="$color" numberOfLines={1}>
              Monthly Target
            </Text>
            <Text fontSize={14} color="$gray10" numberOfLines={2}>
              Target you've set for each month
            </Text>
          </YStack>
          <MoreMenu />
        </XStack>

        <YStack position="relative" items="center" mt="$2" overflow="hidden" width="100%">
          <RadialProgress value={75.55} size={radialSize} />
          <YStack
            position="absolute"
            b={8}
            px={12}
            py={4}
            rounded={999}
            bg={success[50] as any}
          >
            <Text fontSize={12} fontWeight="500" color={success[600] as any}>
              +10%
            </Text>
          </YStack>
        </YStack>

        <Text
          mt="$4"
          text="center"
          fontSize={14}
          color="$gray10"
          self="center"
          maxW={380}
          px={8}
        >
          You earn $3287 today, it's higher than last month. Keep up your good work!
        </Text>
      </YStack>

      <XStack
        justify="space-evenly"
        items="center"
        px={16}
        py={20}
        gap={8}
        width="100%"
        flexWrap="wrap"
      >
        {[
          { label: 'Target', value: '$20K', down: true },
          { label: 'Revenue', value: '$20K', down: false },
          { label: 'Today', value: '$20K', down: false },
        ].map((item) => (
          <YStack key={item.label} items="center" flex={1} gap={4} minW={72}>
            <Text fontSize={13} color="$gray10" numberOfLines={1}>
              {item.label}
            </Text>
            <Text fontSize={16} fontWeight="600" color="$color" numberOfLines={1}>
              {item.value} {item.down ? '↓' : '↑'}
            </Text>
          </YStack>
        ))}
      </XStack>
    </YStack>
  )
}
