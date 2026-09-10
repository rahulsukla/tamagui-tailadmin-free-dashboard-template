import { useWindowDimensions } from 'react-native'
import { XStack, YStack } from 'tamagui'

import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { AspectRatioVideo } from '@/components/ui/AspectRatioVideo'
import { ComponentCard } from '@/components/ui/ComponentCard'

export default function VideosPage() {
  const { width } = useWindowDimensions()
  const twoCol = width >= 1280

  return (
    <YStack gap="$5" flex={1}>
      <PageBreadcrumb pageTitle="Videos" />

      <XStack flexWrap="wrap" gap="$5">
        <YStack width={twoCol ? '48%' : '100%'} gap="$5" grow={1}>
          <ComponentCard title="Video Ratio 16:9">
            <AspectRatioVideo ratio={16 / 9} />
          </ComponentCard>
          <ComponentCard title="Video Ratio 4:3">
            <AspectRatioVideo ratio={4 / 3} />
          </ComponentCard>
        </YStack>
        <YStack width={twoCol ? '48%' : '100%'} gap="$5" grow={1}>
          <ComponentCard title="Video Ratio 21:9">
            <AspectRatioVideo ratio={21 / 9} />
          </ComponentCard>
          <ComponentCard title="Video Ratio 1:1">
            <AspectRatioVideo ratio={1} />
          </ComponentCard>
        </YStack>
      </XStack>
    </YStack>
  )
}
