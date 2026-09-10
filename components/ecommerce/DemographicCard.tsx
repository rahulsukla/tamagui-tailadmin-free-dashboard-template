import Svg, { Circle, Ellipse, Path } from 'react-native-svg'
import { Text, XStack, YStack } from 'tamagui'

import { MoreMenu } from '@/components/charts/MoreMenu'
import { useTemplateConfig } from '@/context/TemplateConfigContext'

const countries = [
  { name: 'USA', customers: '2,379 Customers', pct: 79, code: 'US' },
  { name: 'France', customers: '589 Customers', pct: 23, code: 'FR' },
  { name: 'Canada', customers: '412 Customers', pct: 16, code: 'CA' },
]

function DemographicMapArt({ color }: { color: string }) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 360 180" fill="none">
      <Ellipse cx="180" cy="96" rx="150" ry="62" fill={`${color}14`} />
      <Path
        d="M48 78c18-22 42-30 68-22 14 4 22 14 36 12 10-2 16-10 28-12 20-4 38 6 52 18 8 8 22 10 32 4 12-8 30-6 40 6 6 8 4 20-4 28-14 14-36 18-54 12-12-4-22 2-34 6-18 6-40 2-54-10-8-6-18-8-28-4-16 6-34 2-46-10-8-8-10-20-4-28z"
        fill={`${color}33`}
        stroke={color}
        strokeWidth={1.25}
      />
      <Path
        d="M92 118c10-4 22-2 30 6 6 6 16 8 24 4 12-6 28-4 36 6 4 6 2 14-4 18-14 10-36 8-50 0-8-4-18-4-26 0-10 4-20 0-24-8-4-8 2-18 14-26z"
        fill={`${color}55`}
      />
      <Circle cx="118" cy="72" r="5" fill={color} opacity={0.9} />
      <Circle cx="210" cy="88" r="4" fill={color} opacity={0.75} />
      <Circle cx="268" cy="78" r="3.5" fill={color} opacity={0.7} />
    </Svg>
  )
}

export function DemographicCard() {
  const { brandColor } = useTemplateConfig()

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
    >
      <XStack justify="space-between" items="flex-start" gap={12}>
        <YStack gap={4} flex={1} minW={0}>
          <Text fontSize={18} fontWeight="600" color="$color">
            Customers Demographic
          </Text>
          <Text fontSize={14} color="$gray10">
            Customers by country for the last 30 days
          </Text>
        </YStack>
        <MoreMenu />
      </XStack>

      <YStack
        borderWidth={1}
        borderColor="$borderColor"
        rounded={16}
        height={160}
        items="center"
        justify="center"
        bg="$background"
        overflow="hidden"
        px={12}
      >
        <DemographicMapArt color={brandColor} />
      </YStack>

      <YStack gap={16} flex={1}>
        {countries.map((c) => (
          <XStack key={c.name} items="center" justify="space-between" gap={12}>
            <XStack items="center" gap={12} flex={1} minW={0}>
              <YStack
                width={40}
                height={40}
                rounded={999}
                bg="$gray3"
                items="center"
                justify="center"
              >
                <Text fontSize={11} fontWeight="700" color="$gray11">
                  {c.code}
                </Text>
              </YStack>
              <YStack flex={1} minW={0}>
                <Text fontSize={14} fontWeight="600" color="$color">
                  {c.name}
                </Text>
                <Text fontSize={12} color="$gray10">
                  {c.customers}
                </Text>
              </YStack>
            </XStack>
            <XStack items="center" gap={12} width={132}>
              <YStack flex={1} height={8} rounded={4} bg="$gray3" overflow="hidden">
                <YStack
                  height="100%"
                  width={`${c.pct}%`}
                  bg={brandColor as any}
                  rounded={4}
                />
              </YStack>
              <Text fontSize={13} fontWeight="500" color="$gray11" width={36}>
                {c.pct}%
              </Text>
            </XStack>
          </XStack>
        ))}
      </YStack>
    </YStack>
  )
}
