import { useMemo, type ReactNode } from 'react'
import { ScrollView } from 'react-native'
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg'
import { Text, XStack, YStack } from 'tamagui'

import { useContainerWidth } from '@/components/useContainerWidth'
import { gray } from '@/theme/colors'
import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { useThemeMode } from '@/context/ThemeContext'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MIN_CHART_W = 560

type SimpleBarChartProps = {
  data: number[]
  height?: number
  color?: string
  categories?: string[]
}

export function SimpleBarChart({
  data,
  height = 180,
  color,
  categories = MONTHS,
}: SimpleBarChartProps) {
  const { width: containerW, onLayout } = useContainerWidth(0)
  const { resolvedTheme } = useThemeMode()
  const { brandColor } = useTemplateConfig()
  const barColor = color ?? brandColor
  const needsScroll = containerW > 0 && containerW < MIN_CHART_W
  const chartW = needsScroll || containerW === 0 ? MIN_CHART_W : containerW
  const padL = 36
  const padB = 28
  const padT = 12
  const innerH = height - padB - padT
  const max = Math.max(...data, 1)
  const barGap = 8
  const barW = (chartW - padL - 8) / data.length - barGap
  const grid = resolvedTheme === 'dark' ? gray[800] : gray[200]
  const label = resolvedTheme === 'dark' ? gray[400] : gray[500]

  const bars = useMemo(
    () =>
      data.map((v, i) => {
        const h = (v / max) * innerH
        const x = padL + i * (barW + barGap) + barGap / 2
        const y = padT + innerH - h
        return { x, y, h, label: categories[i] ?? '' }
      }),
    [data, max, innerH, barW, categories]
  )

  const svg = (
    <Svg width={chartW} height={height}>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = padT + innerH * (1 - t)
        return (
          <Line key={t} x1={padL} x2={chartW - 4} y1={y} y2={y} stroke={grid} strokeWidth={1} />
        )
      })}
      {bars.map((b) => (
        <Rect
          key={b.label}
          x={b.x}
          y={b.y}
          width={Math.max(barW, 4)}
          height={Math.max(b.h, 2)}
          rx={5}
          fill={barColor}
        />
      ))}
      {bars.map((b) => (
        <SvgText
          key={`${b.label}-t`}
          x={b.x + barW / 2}
          y={height - 8}
          fill={label}
          fontSize={11}
          textAnchor="middle"
        >
          {b.label}
        </SvgText>
      ))}
    </Svg>
  )

  return (
    <YStack width="100%" onLayout={onLayout} overflow="hidden">
      {containerW === 0 ? null : needsScroll ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {svg}
        </ScrollView>
      ) : (
        svg
      )}
    </YStack>
  )
}

export function ChartCardHeader({
  title,
  subtitle,
  right,
}: {
  title: string
  subtitle?: string
  right?: ReactNode
}) {
  return (
    <XStack items="flex-start" justify="space-between" gap="$3" mb="$4" width="100%">
      <YStack flex={1} gap={4} minW={0}>
        <Text fontSize={18} fontWeight="600" color="$color" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text fontSize={14} color="$gray10" numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </YStack>
      {right}
    </XStack>
  )
}
