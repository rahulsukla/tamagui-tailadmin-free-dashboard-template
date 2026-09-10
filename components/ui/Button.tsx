import type { ReactNode } from 'react'
import Svg, { Path, Rect } from 'react-native-svg'
import { Button as TButton, Text } from 'tamagui'

import { brand } from '@/theme/colors'
import { useThemeMode } from '@/context/ThemeContext'

type ButtonSize = 'sm' | 'md'
type ButtonVariant = 'primary' | 'outline'

type AppButtonProps = {
  children: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
  startIcon?: ReactNode
  endIcon?: ReactNode
  onPress?: () => void
  disabled?: boolean
}

const sizeStyles = {
  sm: { px: 16, py: 12, fontSize: 14 },
  md: { px: 20, py: 14, fontSize: 14 },
} as const

export function AppButton({
  children,
  size = 'md',
  variant = 'primary',
  startIcon,
  endIcon,
  onPress,
  disabled = false,
}: AppButtonProps) {
  const sizing = sizeStyles[size]
  const isPrimary = variant === 'primary'
  const { resolvedTheme } = useThemeMode()

  return (
    <TButton
      unstyled
      disabled={disabled}
      onPress={onPress}
      opacity={disabled ? 0.5 : 1}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      flexDirection="row"
      items="center"
      justify="center"
      gap="$2"
      rounded={8}
      px={sizing.px}
      py={sizing.py}
      bg={
        isPrimary
          ? brand[500]
          : resolvedTheme === 'dark'
            ? '$gray2'
            : '$backgroundStrong'
      }
      borderWidth={isPrimary ? 0 : 1}
      borderColor="$borderColor"
      hoverStyle={isPrimary ? { bg: brand[600] } : { bg: '$backgroundHover' }}
      pressStyle={{ opacity: 0.9 }}
    >
      {startIcon}
      <Text
        fontSize={sizing.fontSize}
        fontWeight="500"
        color={isPrimary ? '#fff' : '$gray11'}
      >
        {children}
      </Text>
      {endIcon}
    </TButton>
  )
}

export function BoxIcon({ color = '#fff', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth={1.75} />
      <Path d="M4 10h16M10 4v16" stroke={color} strokeWidth={1.75} />
    </Svg>
  )
}
