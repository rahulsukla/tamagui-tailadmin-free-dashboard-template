import { YStack } from 'tamagui'

import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { ComponentCard } from '@/components/ui/ComponentCard'
import { ProgressDemoList } from '@/components/ui/ProgressBar'

export default function ProgressPage() {
  return (
    <YStack gap={20} flex={1}>
      <PageBreadcrumb pageTitle="Progress" />
      <ComponentCard title="Progress bars">
        <ProgressDemoList />
      </ComponentCard>
    </YStack>
  )
}
