import { Text, XStack, YStack } from 'tamagui'

import { Badge } from '@/components/ui/Badge'
import { ComponentCard } from '@/components/ui/ComponentCard'
import { useTemplateConfig } from '@/context/TemplateConfigContext'

type DocRow = {
  title: string
  section: string
  target: number
  limit: number
  reviewer: string
}

const ROWS: DocRow[] = [
  { title: 'Cover page', section: 'Cover page', target: 18, limit: 5, reviewer: 'Alex Kim' },
  {
    title: 'Table of contents',
    section: 'Cover page',
    target: 29,
    limit: 24,
    reviewer: 'Blake Lee',
  },
  {
    title: 'Executive summary',
    section: 'Narrative',
    target: 10,
    limit: 13,
    reviewer: 'Casey Morgan',
  },
  {
    title: 'Technical approach',
    section: 'Narrative',
    target: 27,
    limit: 23,
    reviewer: 'Dana Nguyen',
  },
  { title: 'Design', section: 'Narrative', target: 2, limit: 16, reviewer: 'Eden Ortiz' },
  {
    title: 'Capabilities',
    section: 'Narrative',
    target: 20,
    limit: 8,
    reviewer: 'Sam Rivera',
  },
]

/** Documents-style table inspired by the tweakcn Light Green dashboard preview. */
export function DocumentsTable() {
  const { brandColor } = useTemplateConfig()

  return (
    <ComponentCard title="Documents">
      <YStack gap={12}>
        <Text fontSize={13} color="$gray10">
          Structured document checklist with targets, limits, and reviewers.
        </Text>
        <YStack borderWidth={1} borderColor="$borderColor" rounded={12} overflow="hidden">
          <XStack bg="$gray3" px={16} py={12} gap={8}>
            {['Header', 'Section', 'Target', 'Limit', 'Reviewer'].map((h) => (
              <Text key={h} flex={h === 'Header' ? 2 : 1} fontSize={12} fontWeight="600" color="$gray10">
                {h}
              </Text>
            ))}
          </XStack>
          {ROWS.map((row, i) => (
            <XStack
              key={row.title}
              px={16}
              py={14}
              gap={8}
              items="center"
              borderTopWidth={i === 0 ? 0 : 1}
              borderColor="$borderColor"
              bg="$backgroundStrong"
            >
              <Text flex={2} fontSize={14} fontWeight="500" color="$color" numberOfLines={1}>
                {row.title}
              </Text>
              <YStack flex={1}>
                <Badge size="sm" color="light">
                  {row.section}
                </Badge>
              </YStack>
              <Text flex={1} fontSize={14} color="$gray11">
                {row.target}
              </Text>
              <Text flex={1} fontSize={14} color="$gray11">
                {row.limit}
              </Text>
              <Text flex={1} fontSize={13} color={brandColor as any} fontWeight="500" numberOfLines={1}>
                {row.reviewer}
              </Text>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </ComponentCard>
  )
}
