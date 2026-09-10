import { useMemo, type ReactNode } from 'react'
import { ScrollView, useWindowDimensions } from 'react-native'
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg'
import { Text, XStack, YStack } from 'tamagui'

import { brand, gray } from '@/theme/colors'
import { useThemeMode } from '@/context/ThemeContext'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

type SimpleBarChartProps = {
  data: number[]
  height?: number
  color?: string
  categories?: string[]
}

export function SimpleBarChart({
  data,
  height = 180,
  color = brand[500],
  categories = MONTHS,
}: SimpleBarChartProps) {
  const { width: screenW } = useWindowDimensions()
  const { resolvedTheme } = useThemeMode()
  const chartW = Math.max(screenW - 80, 650)
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
        return { x, y, h, v, label: categories[i] ?? '' }
      }),
    [data, max, innerH, barW, categories]
  )

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Svg width={chartW} height={height}>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = padT + innerH * (1 - t)
          return (
            <Line
              key={t}
              x1={padL}
              x2={chartW - 4}
              y1={y}
              y2={y}
              stroke={grid}
              strokeWidth={1}
            />
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
            fill={color}
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
    </ScrollView>
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
    <XStack items="flex-start" justify="space-between" gap="$3" mb="$4">
      <YStack flex={1} gap={4}>
        <Text fontSize={18} fontWeight="600" color="$color">
          {title}
        </Text>
        {subtitle ? (
          <Text fontSize={14} color="$gray10">
            {subtitle}
          </Text>
        ) : null}
      </YStack>
      {right}
    </XStack>
  )
}
