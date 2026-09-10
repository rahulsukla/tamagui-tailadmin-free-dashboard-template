import { Image } from 'expo-image'
import { useWindowDimensions } from 'react-native'
import { XStack, YStack } from 'tamagui'

export function ResponsiveImage() {
  return (
    <YStack
      borderWidth={1}
      borderColor="$borderColor"
      rounded={12}
      overflow="hidden"
    >
      <Image
        source={require('@/assets/demo/grid-image/image-01.png')}
        style={{ width: '100%', aspectRatio: 16 / 9 }}
        contentFit="cover"
        accessibilityLabel="Cover"
      />
    </YStack>
  )
}

export function TwoColumnImageGrid() {
  const { width } = useWindowDimensions()
  const cols = width >= 640 ? 2 : 1

  return (
    <XStack flexWrap="wrap" gap="$4">
      {[
        require('@/assets/demo/grid-image/image-02.png'),
        require('@/assets/demo/grid-image/image-03.png'),
      ].map((src, i) => (
        <YStack
          key={i}
          width={cols === 1 ? '100%' : '47%'}
          grow={1}
          borderWidth={1}
          borderColor="$borderColor"
          rounded={12}
          overflow="hidden"
        >
          <Image
            source={src}
            style={{ width: '100%', aspectRatio: 1.2 }}
            contentFit="cover"
            accessibilityLabel="grid"
          />
        </YStack>
      ))}
    </XStack>
  )
}

export function ThreeColumnImageGrid() {
  const { width } = useWindowDimensions()
  const cols = width >= 1280 ? 3 : width >= 640 ? 2 : 1

  return (
    <XStack flexWrap="wrap" gap="$4">
      {[
        require('@/assets/demo/grid-image/image-04.png'),
        require('@/assets/demo/grid-image/image-05.png'),
        require('@/assets/demo/grid-image/image-06.png'),
      ].map((src, i) => (
        <YStack
          key={i}
          width={cols === 1 ? '100%' : cols === 2 ? '47%' : '31%'}
          grow={1}
          borderWidth={1}
          borderColor="$borderColor"
          rounded={12}
          overflow="hidden"
        >
          <Image
            source={src}
            style={{ width: '100%', aspectRatio: 1.2 }}
            contentFit="cover"
            accessibilityLabel="grid"
          />
        </YStack>
      ))}
    </XStack>
  )
}
