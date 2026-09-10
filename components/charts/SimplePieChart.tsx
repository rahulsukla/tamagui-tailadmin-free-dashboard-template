import { useMemo } from 'react'
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg'
import { Text, XStack, YStack } from 'tamagui'

import { useContainerWidth } from '@/components/useContainerWidth'
import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { useThemeMode } from '@/context/ThemeContext'
import { gray } from '@/theme/colors'

export type PieSlice = {
  label: string
  value: number
  color?: string
}

type SimplePieChartProps = {
  data: PieSlice[]
  size?: number
}

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polar(cx, cy, r, end)
  const e = polar(cx, cy, r, start)
  const large = end - start <= 180 ? 0 : 1
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y} Z`
}

export function SimplePieChart({ data, size = 200 }: SimplePieChartProps) {
  const { brandColor } = useTemplateConfig()
  const { resolvedTheme } = useThemeMode()
  const { width: containerW, onLayout } = useContainerWidth(0)
  const muted = resolvedTheme === 'dark' ? gray[400] : gray[500]
  const chartSize =
    containerW > 0 ? Math.min(size, Math.max(140, containerW)) : Math.min(size, 200)
  const total = Math.max(
    data.reduce((sum, d) => sum + d.value, 0),
    1
  )
  const cx = chartSize / 2
  const cy = chartSize / 2
  const r = chartSize * 0.38
  const inner = r * 0.55

  const palette = [
    brandColor,
    '#74c89a',
    '#4aad78',
    '#2f7058',
    '#a8dfc0',
    '#f79009',
  ]

  const slices = useMemo(() => {
    let angle = 0
    return data.map((d, i) => {
      const sweep = (d.value / total) * 360
      const start = angle
      const end = angle + sweep
      angle = end
      return {
        ...d,
        start,
        end,
        color: d.color ?? palette[i % palette.length],
        pct: Math.round((d.value / total) * 100),
      }
    })
  }, [data, total, brandColor])

  return (
    <YStack items="center" gap={16} width="100%" minW={0} overflow="hidden" onLayout={onLayout}>
      {containerW > 0 ? (
        <Svg width={chartSize} height={chartSize} viewBox={`0 0 ${chartSize} ${chartSize}`}>
          <G>
            {slices.map((s) =>
              s.end - s.start >= 359.9 ? (
                <Circle key={s.label} cx={cx} cy={cy} r={r} fill={s.color} />
              ) : (
                <Path
                  key={s.label}
                  d={arcPath(cx, cy, r, s.start, s.end)}
                  fill={s.color}
                />
              )
            )}
            <Circle
              cx={cx}
              cy={cy}
              r={inner}
              fill={resolvedTheme === 'dark' ? gray[900] : '#fff'}
            />
            <SvgText
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              fontSize={18}
              fontWeight="700"
              fill={resolvedTheme === 'dark' ? '#fff' : gray[800]}
            >
              {total}
            </SvgText>
            <SvgText x={cx} y={cy + 14} textAnchor="middle" fontSize={11} fill={muted}>
              Total
            </SvgText>
          </G>
        </Svg>
      ) : null}

      <YStack gap={10} width="100%" minW={0}>
        {slices.map((s) => (
          <XStack key={s.label} items="center" justify="space-between" gap={12} minW={0}>
            <XStack items="center" gap={10} flex={1} minW={0}>
              <YStack width={10} height={10} rounded={999} bg={s.color as any} shrink={0} />
              <Text fontSize={14} color="$color" numberOfLines={1} flex={1} minW={0}>
                {s.label}
              </Text>
            </XStack>
            <Text fontSize={13} color="$gray10" fontWeight="500" shrink={0}>
              {s.pct}%
            </Text>
          </XStack>
        ))}
      </YStack>
    </YStack>
  )
}
