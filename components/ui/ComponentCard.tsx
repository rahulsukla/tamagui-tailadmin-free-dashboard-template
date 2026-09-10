import type { ReactNode } from 'react'
import { Text, YStack } from 'tamagui'

type ComponentCardProps = {
  title: string
  children: ReactNode
  desc?: string
}

export function ComponentCard({ title, children, desc }: ComponentCardProps) {
  return (
    <YStack
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      overflow="hidden"
    >
      <YStack px="$5" py="$4" gap="$1">
        <Text fontSize={16} fontWeight="500" color="$color">
          {title}
        </Text>
        {desc ? (
          <Text fontSize={14} color="$gray10">
            {desc}
          </Text>
        ) : null}
      </YStack>
      <YStack p="$5" borderTopWidth={1} borderColor="$borderColor" gap="$4">
        {children}
      </YStack>
    </YStack>
  )
}
