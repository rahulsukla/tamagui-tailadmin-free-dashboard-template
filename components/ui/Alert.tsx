import { Link } from 'expo-router'
import Svg, { Path } from 'react-native-svg'
import { Text, XStack, YStack } from 'tamagui'

import { useThemeMode } from '@/context/ThemeContext'
import { error, success, warning } from '@/theme/colors'

export type AlertVariant = 'success' | 'error' | 'warning' | 'info'

type AlertProps = {
  variant: AlertVariant
  title: string
  message: string
  showLink?: boolean
  linkHref?: string
  linkText?: string
}

function palette(variant: AlertVariant, dark: boolean) {
  const map = {
    success: {
      border: dark ? 'rgba(18,183,106,0.3)' : success[500],
      bg: dark ? 'rgba(18,183,106,0.15)' : success[50],
      icon: success[500],
    },
    error: {
      border: dark ? 'rgba(240,68,56,0.3)' : error[500],
      bg: dark ? 'rgba(240,68,56,0.15)' : error[50],
      icon: error[500],
    },
    warning: {
      border: dark ? 'rgba(247,144,9,0.3)' : warning[500],
      bg: dark ? 'rgba(247,144,9,0.15)' : warning[50],
      icon: warning[500],
    },
    info: {
      border: dark ? 'rgba(11,165,236,0.3)' : '#0ba5ec',
      bg: dark ? 'rgba(11,165,236,0.15)' : '#f0f9ff',
      icon: '#0ba5ec',
    },
  } as const
  return map[variant]
}

function AlertIcon({ variant, color }: { variant: AlertVariant; color: string }) {
  if (variant === 'success') {
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 3.7a8.3 8.3 0 1 0 0 16.6 8.3 8.3 0 0 0 0-16.6ZM1.9 12a10.1 10.1 0 1 1 20.2 0 10.1 10.1 0 0 1-20.2 0Zm13.72-2.26a1 1 0 0 0-1.41-1.41l-3.16 3.16-1.54-1.54a1 1 0 0 0-1.41 1.41l2.24 2.25a1 1 0 0 0 1.41 0l4.87-4.87Z"
          fill={color}
        />
      </Svg>
    )
  }

  const isError = variant === 'error'
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d={
          isError
            ? 'M12 3.65a8.35 8.35 0 1 0 0 16.7 8.35 8.35 0 0 0 0-16.7ZM1.85 12a10.15 10.15 0 1 1 20.3 0 10.15 10.15 0 0 1-20.3 0ZM12.75 7.38a.75.75 0 0 0-1.5 0v5.68a.75.75 0 0 0 1.5 0V7.38ZM12 17.48a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'
            : 'M12 3.65a8.35 8.35 0 1 0 0 16.7 8.35 8.35 0 0 0 0-16.7ZM1.85 12a10.15 10.15 0 1 1 20.3 0 10.15 10.15 0 0 1-20.3 0ZM12 6.52a1 1 0 0 1 1 1V7.54a1 1 0 0 1-2 0V7.52a1 1 0 0 1 1-1Zm-.75 4.2a.75.75 0 0 1 1.5 0v5.68a.75.75 0 0 1-1.5 0V10.72Z'
        }
        fill={color}
      />
    </Svg>
  )
}

export function Alert({
  variant,
  title,
  message,
  showLink = false,
  linkHref = '/',
  linkText = 'Learn more',
}: AlertProps) {
  const { resolvedTheme } = useThemeMode()
  const theme = palette(variant, resolvedTheme === 'dark')

  return (
    <YStack rounded={12} borderWidth={1} borderColor={theme.border} bg={theme.bg} p="$4">
      <XStack items="flex-start" gap="$3">
        <YStack mt={-2}>
          <AlertIcon variant={variant} color={theme.icon} />
        </YStack>
        <YStack flex={1} gap="$1">
          <Text fontSize={14} fontWeight="600" color="$color">
            {title}
          </Text>
          <Text fontSize={14} color="$gray10">
            {message}
          </Text>
          {showLink ? (
            <Link href={linkHref as any}>
              <Text
                mt="$2"
                fontSize={14}
                fontWeight="500"
                color="$gray10"
                textDecorationLine="underline"
              >
                {linkText}
              </Text>
            </Link>
          ) : null}
        </YStack>
      </XStack>
    </YStack>
  )
}
