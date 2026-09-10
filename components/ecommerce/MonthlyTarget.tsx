import { Text, XStack, YStack } from 'tamagui'

import { MoreMenu } from '@/components/charts/MoreMenu'
import { RadialProgress } from '@/components/charts/SimpleAreaChart'
import { success } from '@/theme/colors'

export function MonthlyTarget() {
  return (
    <YStack
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$gray3"
      overflow="hidden"
    >
      <YStack
        px="$5"
        pt="$5"
        pb="$6"
        bg="$backgroundStrong"
        rounded={16}
        gap="$2"
      >
        <XStack justify="space-between" items="flex-start">
          <YStack gap={4} flex={1}>
            <Text fontSize={18} fontWeight="600" color="$color">
              Monthly Target
            </Text>
            <Text fontSize={14} color="$gray10">
              Target you've set for each month
            </Text>
          </YStack>
          <MoreMenu />
        </XStack>

        <YStack position="relative" items="center" mt="$2">
          <RadialProgress value={75.55} size={240} />
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

        <Text mt="$4" text="center" fontSize={14} color="$gray10" self="center" maxW={380}>
          You earn $3287 today, it's higher than last month. Keep up your good work!
        </Text>
      </YStack>

      <XStack justify="center" items="center" gap="$5" px="$5" py="$4">
        {[
          { label: 'Target', value: '$20K', down: true },
          { label: 'Revenue', value: '$20K', down: false },
          { label: 'Today', value: '$20K', down: false },
        ].map((item, i) => (
          <XStack key={item.label} items="center" gap="$5">
            {i > 0 ? <YStack width={1} height={28} bg="$borderColor" /> : null}
            <YStack items="center">
              <Text fontSize={13} color="$gray10" mb={4}>
                {item.label}
              </Text>
              <Text fontSize={16} fontWeight="600" color="$color">
                {item.value} {item.down ? '↓' : '↑'}
              </Text>
            </YStack>
          </XStack>
        ))}
      </XStack>
    </YStack>
  )
}
