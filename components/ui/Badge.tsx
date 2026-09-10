import type { ReactNode } from 'react'
import { Text, XStack } from 'tamagui'

import { brand, error, gray, success, warning } from '@/theme/colors'
import { useThemeMode } from '@/context/ThemeContext'

type BadgeVariant = 'light' | 'solid'
type BadgeSize = 'sm' | 'md'
type BadgeColor =
  | 'primary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'

type BadgeProps = {
  variant?: BadgeVariant
  size?: BadgeSize
  color?: BadgeColor
  startIcon?: ReactNode
  endIcon?: ReactNode
  children: ReactNode
}

const info = { 50: '#f0f9ff', 500: '#0ba5ec' }

function useBadgeColors(variant: BadgeVariant, color: BadgeColor, isDark: boolean) {
  if (variant === 'solid') {
    const map: Record<BadgeColor, { bg: string; fg: string }> = {
      primary: { bg: brand[500], fg: '#fff' },
      success: { bg: success[500], fg: '#fff' },
      error: { bg: error[500], fg: '#fff' },
      warning: { bg: warning[500], fg: '#fff' },
      info: { bg: info[500], fg: '#fff' },
      light: { bg: isDark ? 'rgba(255,255,255,0.05)' : gray[400], fg: '#fff' },
      dark: { bg: gray[700], fg: '#fff' },
    }
    return map[color]
  }

  const map: Record<BadgeColor, { bg: string; fg: string }> = {
    primary: {
      bg: isDark ? 'rgba(70,95,255,0.15)' : brand[50],
      fg: isDark ? brand[400] : brand[500],
    },
    success: {
      bg: isDark ? 'rgba(18,183,106,0.15)' : success[50],
      fg: success[600],
    },
    error: {
      bg: isDark ? 'rgba(240,68,56,0.15)' : error[50],
      fg: error[600],
    },
    warning: {
      bg: isDark ? 'rgba(247,144,9,0.15)' : warning[50],
      fg: isDark ? '#fb923c' : warning[600],
    },
    info: {
      bg: isDark ? 'rgba(11,165,236,0.15)' : info[50],
      fg: info[500],
    },
    light: {
      bg: isDark ? 'rgba(255,255,255,0.05)' : gray[100],
      fg: isDark ? 'rgba(255,255,255,0.8)' : gray[700],
    },
    dark: {
      bg: isDark ? 'rgba(255,255,255,0.05)' : gray[500],
      fg: '#fff',
    },
  }
  return map[color]
}

export function Badge({
  variant = 'light',
  color = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  children,
}: BadgeProps) {
  const { resolvedTheme } = useThemeMode()
  const palette = useBadgeColors(variant, color, resolvedTheme === 'dark')

  return (
    <XStack
      items="center"
      justify="center"
      gap={4}
      px={10}
      py={2}
      rounded={999}
      bg={palette.bg as any}
    >
      {startIcon ? (
        <Text fontSize={12} color={palette.fg as any} fontWeight="700" lineHeight={14}>
          +
        </Text>
      ) : null}
      <Text
        fontSize={size === 'sm' ? 12 : 14}
        fontWeight="500"
        color={palette.fg as any}
        lineHeight={size === 'sm' ? 18 : 20}
      >
        {children}
      </Text>
      {endIcon ? (
        <Text fontSize={12} color={palette.fg as any} fontWeight="700" lineHeight={14}>
          +
        </Text>
      ) : null}
    </XStack>
  )
}

/** Kept for page API parity with TailAdmin demos */
export function PlusGlyph(_props?: { color?: string; size?: number }) {
  return null
}
