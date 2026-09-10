import { ScrollView, useWindowDimensions } from 'react-native'
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

const COLS = [180, 120, 72, 72, 120] as const
const FLEX = [2.2, 1.4, 0.8, 0.8, 1.2] as const

/** Documents-style table inspired by the tweakcn Light Green dashboard preview. */
export function DocumentsTable() {
  const { brandColor } = useTemplateConfig()
  const { width } = useWindowDimensions()
  const compact = width < 900

  return (
    <ComponentCard title="Documents">
      <YStack gap={12} width="100%">
        <Text fontSize={13} color="$gray10">
          Structured document checklist with targets, limits, and reviewers.
        </Text>
        <YStack borderWidth={1} borderColor="$borderColor" rounded={12} overflow="hidden">
          <ScrollView
            horizontal={compact}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <YStack
              width={compact ? COLS.reduce((a, b) => a + b, 0) + 32 : '100%'}
              minW={compact ? undefined : '100%'}
            >
              <XStack bg="$gray3" px={16} py={12} gap={8}>
                {['Header', 'Section', 'Target', 'Limit', 'Reviewer'].map((h, i) => (
                  <Text
                    key={h}
                    width={compact ? COLS[i] : undefined}
                    flex={compact ? undefined : FLEX[i]}
                    fontSize={12}
                    fontWeight="600"
                    color="$gray10"
                    numberOfLines={1}
                    minW={0}
                  >
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
                  <Text
                    width={compact ? COLS[0] : undefined}
                    flex={compact ? undefined : FLEX[0]}
                    fontSize={14}
                    fontWeight="500"
                    color="$color"
                    numberOfLines={1}
                    minW={0}
                  >
                    {row.title}
                  </Text>
                  <YStack
                    width={compact ? COLS[1] : undefined}
                    flex={compact ? undefined : FLEX[1]}
                    minW={0}
                    overflow="hidden"
                  >
                    <Badge size="sm" color="light">
                      {row.section}
                    </Badge>
                  </YStack>
                  <Text
                    width={compact ? COLS[2] : undefined}
                    flex={compact ? undefined : FLEX[2]}
                    fontSize={14}
                    color="$gray11"
                    numberOfLines={1}
                    minW={0}
                  >
                    {row.target}
                  </Text>
                  <Text
                    width={compact ? COLS[3] : undefined}
                    flex={compact ? undefined : FLEX[3]}
                    fontSize={14}
                    color="$gray11"
                    numberOfLines={1}
                    minW={0}
                  >
                    {row.limit}
                  </Text>
                  <Text
                    width={compact ? COLS[4] : undefined}
                    flex={compact ? undefined : FLEX[4]}
                    fontSize={13}
                    color={brandColor as any}
                    fontWeight="500"
                    numberOfLines={1}
                    minW={0}
                  >
                    {row.reviewer}
                  </Text>
                </XStack>
              ))}
            </YStack>
          </ScrollView>
        </YStack>
      </YStack>
    </ComponentCard>
  )
}
