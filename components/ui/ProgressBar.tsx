import { Text, XStack, YStack } from 'tamagui'

import { useTemplateConfig } from '@/context/TemplateConfigContext'

type ProgressBarProps = {
  label: string
  value: number
  hint?: string
}

export function ProgressBar({ label, value, hint }: ProgressBarProps) {
  const { brandColor } = useTemplateConfig()
  const pct = Math.max(0, Math.min(100, value))

  return (
    <YStack gap={8} width="100%">
      <XStack justify="space-between" items="center" gap={12}>
        <Text fontSize={14} fontWeight="500" color="$color">
          {label}
        </Text>
        <Text fontSize={13} color="$gray10">
          {pct}%
        </Text>
      </XStack>
      <YStack height={10} rounded={999} bg="$gray3" overflow="hidden" width="100%">
        <YStack height="100%" width={`${pct}%`} bg={brandColor as any} rounded={999} />
      </YStack>
      {hint ? (
        <Text fontSize={12} color="$gray10">
          {hint}
        </Text>
      ) : null}
    </YStack>
  )
}

export function ProgressDemoList() {
  return (
    <YStack gap={20} width="100%">
      <ProgressBar label="Onboarding" value={72} hint="3 of 4 steps complete" />
      <ProgressBar label="Storage used" value={48} hint="4.8 GB of 10 GB" />
      <ProgressBar label="Campaign reach" value={91} hint="Near target" />
      <ProgressBar label="Support SLA" value={33} hint="Needs attention" />
    </YStack>
  )
}
