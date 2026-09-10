import { Image } from 'expo-image'
import type { ImageSource } from 'expo-image'
import { View } from 'react-native'
import { YStack } from 'tamagui'

import { useThemeMode } from '@/context/ThemeContext'
import { success, warning } from '@/theme/colors'

type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
type AvatarStatus = 'online' | 'offline' | 'busy' | 'none'

type AvatarProps = {
  source: ImageSource
  alt?: string
  size?: AvatarSize
  status?: AvatarStatus
}

const sizes: Record<AvatarSize, number> = {
  xsmall: 24,
  small: 32,
  medium: 40,
  large: 48,
  xlarge: 56,
  xxlarge: 64,
}

const statusSizes: Record<AvatarSize, number> = {
  xsmall: 6,
  small: 8,
  medium: 10,
  large: 12,
  xlarge: 14,
  xxlarge: 16,
}

const statusColors: Record<Exclude<AvatarStatus, 'none'>, string> = {
  online: success[500],
  offline: '#f97066',
  busy: warning[500],
}

export function Avatar({
  source,
  alt = 'User Avatar',
  size = 'medium',
  status = 'none',
}: AvatarProps) {
  const dim = sizes[size]
  const { resolvedTheme } = useThemeMode()
  const border = resolvedTheme === 'dark' ? '#101828' : '#ffffff'

  return (
    <YStack position="relative" width={dim} height={dim} rounded={999}>
      <Image
        source={source}
        style={{ width: dim, height: dim, borderRadius: 999 }}
        contentFit="cover"
        accessibilityLabel={alt}
      />
      {status !== 'none' ? (
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: statusSizes[size],
            height: statusSizes[size],
            borderRadius: 999,
            backgroundColor: statusColors[status],
            borderWidth: 1.5,
            borderColor: border,
          }}
        />
      ) : null}
    </YStack>
  )
}
