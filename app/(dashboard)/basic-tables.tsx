import { YStack } from 'tamagui'

import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { BasicTableOne } from '@/components/tables/BasicTableOne'
import { ComponentCard } from '@/components/ui/ComponentCard'

export default function BasicTablesPage() {
  return (
    <YStack gap="$5" flex={1}>
      <PageBreadcrumb pageTitle="Basic Tables" />
      <ComponentCard title="Basic Table 1">
        <BasicTableOne />
      </ComponentCard>
    </YStack>
  )
}
