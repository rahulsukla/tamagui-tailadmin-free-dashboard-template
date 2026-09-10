import { useMemo } from 'react'
import { ScrollView } from 'react-native'
import Svg, { Defs, LinearGradient, Line, Path, Stop, Text as SvgText } from 'react-native-svg'
import { Text, XStack, YStack } from 'tamagui'

import { useContainerWidth } from '@/components/useContainerWidth'
import { gray } from '@/theme/colors'
import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { useThemeMode } from '@/context/ThemeContext'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MIN_CHART_W = 640

type Series = { name: string; data: number[]; color: string }

type SimpleAreaChartProps = {
  series: Series[]
  height?: number
  categories?: string[]
}

function buildPath(data: number[], max: number, padL: number, padT: number, innerH: number, step: number) {
  return data
    .map((v, i) => {
      const x = padL + i * step
      const y = padT + innerH - (v / max) * innerH
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
}

export function SimpleAreaChart({
  series,
  height = 310,
  categories = MONTHS,
}: SimpleAreaChartProps) {
  const { width: containerW, onLayout } = useContainerWidth(0)
  const { resolvedTheme } = useThemeMode()
  const needsScroll = containerW > 0 && containerW < MIN_CHART_W
  const chartW = needsScroll || containerW === 0 ? MIN_CHART_W : containerW
  const padL = 40
  const padB = 28
  const padT = 16
  const innerH = height - padB - padT
  const max = Math.max(...series.flatMap((s) => s.data), 1)
  const step = (chartW - padL - 16) / Math.max(categories.length - 1, 1)
  const grid = resolvedTheme === 'dark' ? gray[800] : gray[200]
  const label = resolvedTheme === 'dark' ? gray[400] : gray[500]

  const paths = useMemo(
    () =>
      series.map((s) => {
        const line = buildPath(s.data, max, padL, padT, innerH, step)
        const lastX = padL + (s.data.length - 1) * step
        const area = `${line} L ${lastX} ${padT + innerH} L ${padL} ${padT + innerH} Z`
        return { ...s, line, area }
      }),
    [series, max, innerH, step]
  )

  const svg = (
        <Svg width={chartW} height={height}>
          <Defs>
            {paths.map((p) => (
              <LinearGradient key={p.name} id={`grad-${p.name}`} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={p.color} stopOpacity={0.45} />
                <Stop offset="100%" stopColor={p.color} stopOpacity={0} />
              </LinearGradient>
            ))}
          </Defs>
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const y = padT + innerH * (1 - t)
            return (
              <Line
                key={t}
                x1={padL}
                x2={chartW - 8}
                y1={y}
                y2={y}
                stroke={grid}
                strokeWidth={1}
              />
            )
          })}
          {paths.map((p) => (
            <Path key={`${p.name}-a`} d={p.area} fill={`url(#grad-${p.name})`} />
          ))}
          {paths.map((p) => (
            <Path
              key={`${p.name}-l`}
              d={p.line}
              stroke={p.color}
              strokeWidth={2}
              fill="none"
            />
          ))}
          {categories.map((c, i) => (
            <SvgText
              key={c}
              x={padL + i * step}
              y={height - 8}
              fill={label}
              fontSize={11}
              textAnchor="middle"
            >
              {c}
            </SvgText>
          ))}
        </Svg>
  )

  return (
    <YStack gap="$3" width="100%" onLayout={onLayout} overflow="hidden">
      <XStack gap="$4" flexWrap="wrap">
        {series.map((s) => (
          <XStack key={s.name} items="center" gap="$2">
            <YStack width={10} height={10} rounded={999} bg={s.color as any} />
            <Text fontSize={13} color="$gray10">
              {s.name}
            </Text>
          </XStack>
        ))}
      </XStack>
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

export function RadialProgress({
  value = 75.55,
  size = 220,
}: {
  value?: number
  size?: number
}) {
  const { brandColor } = useTemplateConfig()
  const stroke = 14
  const r = (size - stroke) / 2
  const cx = size / 2
  const cy = size / 2
  // Semi-circle arc from -85deg to 85deg ≈ 170deg of 360
  const startAngle = (-85 * Math.PI) / 180
  const endAngle = (85 * Math.PI) / 180
  const sweep = endAngle - startAngle
  const progress = Math.min(Math.max(value, 0), 100) / 100

  const polar = (ang: number) => ({
    x: cx + r * Math.cos(ang),
    y: cy + r * Math.sin(ang),
  })

  const arcPath = (from: number, to: number) => {
    const s = polar(from)
    const e = polar(to)
    const large = to - from > Math.PI ? 1 : 0
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
  }

  const track = arcPath(startAngle, endAngle)
  const progEnd = startAngle + sweep * progress
  const prog = arcPath(startAngle, progEnd)

  return (
    <YStack items="center" justify="center" width={size} height={size * 0.72} self="center">
      <Svg width={size} height={size * 0.72} viewBox={`0 0 ${size} ${size * 0.72}`}>
        <Path
          d={track}
          stroke="#E4E7EC"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d={prog}
          stroke={brandColor}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
      <YStack position="absolute" items="center" t="35%">
        <Text fontSize={36} fontWeight="600" color="$color">
          {value.toFixed(2)}%
        </Text>
      </YStack>
    </YStack>
  )
}
