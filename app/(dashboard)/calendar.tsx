import { YStack } from 'tamagui'

import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { CalendarBoard } from '@/components/calendar/CalendarBoard'

export default function CalendarPage() {
  return (
    <YStack gap="$5" flex={1}>
      <PageBreadcrumb pageTitle="Calendar" />
      <CalendarBoard />
    </YStack>
  )
}
