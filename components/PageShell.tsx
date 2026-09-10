import type { ReactNode } from 'react'
import { YStack } from 'tamagui'

import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { PageBreadcrumb } from '@/components/PageBreadcrumb'

export function PageShell({
  title,
  children,
}: {
  title: string
  children?: ReactNode
}) {
  const { config } = useTemplateConfig()
  const pad = config.density === 'compact' ? '$3' : '$4'

  return (
    <YStack flex={1} gap="$4">
      <PageBreadcrumb pageTitle={title} />
      <YStack
        bg="$backgroundStrong"
        borderWidth={1}
        borderColor="$borderColor"
        rounded={12}
        p={pad}
        gap="$3"
      >
        {children}
      </YStack>
    </YStack>
  )
}
