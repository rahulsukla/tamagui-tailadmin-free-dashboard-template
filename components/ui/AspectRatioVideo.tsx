import { Image } from 'expo-image'
import { Linking, Platform, Pressable, View } from 'react-native'
import { Text, YStack } from 'tamagui'

type AspectRatioVideoProps = {
  videoUrl?: string
  ratio: number
  title?: string
}

const DEFAULT_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
const WATCH_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

export function AspectRatioVideo({
  videoUrl = DEFAULT_URL,
  ratio,
  title = 'YouTube video',
}: AspectRatioVideoProps) {
  if (Platform.OS === 'web') {
    return (
      <View style={{ width: '100%', borderRadius: 8, overflow: 'hidden', aspectRatio: ratio }}>
        <iframe
          src={videoUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 0, width: '100%', height: '100%' }}
        />
      </View>
    )
  }

  return (
    <Pressable
      onPress={() => {
        void Linking.openURL(WATCH_URL)
      }}
      style={{ width: '100%' }}
    >
      <YStack
        width="100%"
        aspectRatio={ratio}
        rounded={8}
        overflow="hidden"
        bg="$gray3"
        items="center"
        justify="center"
        borderWidth={1}
        borderColor="$borderColor"
      >
        <Image
          source={require('@/assets/demo/video-thumb/thumb-16.png')}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          contentFit="cover"
        />
        <YStack
          width={56}
          height={56}
          rounded={999}
          bg="rgba(0,0,0,0.55)"
          items="center"
          justify="center"
        >
          <Text color="#fff" fontSize={22}>
            ▶
          </Text>
        </YStack>
      </YStack>
    </Pressable>
  )
}
