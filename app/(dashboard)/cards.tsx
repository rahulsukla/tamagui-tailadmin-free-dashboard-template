import { useWindowDimensions } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import {
  AccentTile,
  ChatTile,
  FeatureTile,
  MetricTile,
  StatusTile,
} from '@/components/cards/TileVariants'
import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { ComponentCard } from '@/components/ui/ComponentCard'

export default function CardsPage() {
  const { width } = useWindowDimensions()
  const multi = width >= 900

  return (
    <YStack gap={20} flex={1}>
      <PageBreadcrumb pageTitle="Cards" />

      <ComponentCard
        title="Metric tiles"
        desc="Compact KPI surfaces for dashboards and overview rows."
      >
        <XStack flexDirection={multi ? 'row' : 'column'} gap={16} flexWrap="wrap">
          <MetricTile
            label="Active users"
            value="12,480"
            delta="+8.1%"
            positive
            hint="Vs last 7 days"
          />
          <MetricTile
            label="Churn risk"
            value="2.4%"
            delta="-0.3%"
            positive
            hint="Lower is better"
          />
          <MetricTile
            label="Open tickets"
            value="37"
            delta="+5"
            positive={false}
            hint="Needs triage"
          />
        </XStack>
      </ComponentCard>

      <ComponentCard title="Accent & status" desc="Brand callouts and health indicators.">
        <XStack flexDirection={multi ? 'row' : 'column'} gap={16}>
          <AccentTile
            title="Upgrade workspace"
            body="Unlock advanced charts, shared views, and audit logs for your team."
            cta="View plans"
          />
          <StatusTile
            title="Billing pipeline"
            subtitle="Invoices syncing with Stripe — last run 4 min ago."
            status="success"
          />
          <StatusTile
            title="CDN cache"
            subtitle="Edge hit rate dipped below the 90% target overnight."
            status="warning"
          />
        </XStack>
      </ComponentCard>

      <ComponentCard title="Feature tiles" desc="Explain capabilities with a short icon block.">
        <XStack flexDirection={multi ? 'row' : 'column'} gap={16}>
          <FeatureTile
            icon="◫"
            title="Live themes"
            body="Switch brand presets from the config panel without rebuilding."
          />
          <FeatureTile
            icon="⌁"
            title="Universal shell"
            body="One Expo Router layout for web, iOS, and Android."
          />
          <FeatureTile
            icon="◎"
            title="Lean charts"
            body="SVG bars, areas, and pies — no heavy chart SDK required."
          />
        </XStack>
      </ComponentCard>

      <ComponentCard
        title="Chat tile"
        desc="Dummy sender/receiver thread with a message composer — drop into support or CRM screens."
      >
        <YStack maxW={520} width="100%" self="flex-start">
          <ChatTile />
        </YStack>
      </ComponentCard>

      <Text fontSize={13} color="$gray10">
        Import from `@/components/cards/TileVariants` — MetricTile, AccentTile, StatusTile,
        FeatureTile, ChatTile.
      </Text>
    </YStack>
  )
}
