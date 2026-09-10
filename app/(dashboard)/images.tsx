import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { ComponentCard } from '@/components/ui/ComponentCard'
import {
  ResponsiveImage,
  ThreeColumnImageGrid,
  TwoColumnImageGrid,
} from '@/components/ui/ImageGrids'
import { YStack } from 'tamagui'

export default function ImagesPage() {
  return (
    <YStack gap="$5" flex={1}>
      <PageBreadcrumb pageTitle="Images" />

      <ComponentCard title="Responsive image">
        <ResponsiveImage />
      </ComponentCard>

      <ComponentCard title="Image in 2 Grid">
        <TwoColumnImageGrid />
      </ComponentCard>

      <ComponentCard title="Image in 3 Grid">
        <ThreeColumnImageGrid />
      </ComponentCard>
    </YStack>
  )
}
