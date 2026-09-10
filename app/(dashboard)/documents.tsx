import { YStack } from 'tamagui'

import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { DocumentsTable } from '@/components/tables/DocumentsTable'

export default function DocumentsPage() {
  return (
    <YStack gap={20} flex={1}>
      <PageBreadcrumb pageTitle="Documents" />
      <DocumentsTable />
    </YStack>
  )
}
