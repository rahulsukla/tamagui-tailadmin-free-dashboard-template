import { Link, Stack } from 'expo-router'
import { Button, Text, YStack } from 'tamagui'

import { brand } from '@/theme/colors'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found', headerShown: false }} />
      <YStack flex={1} items="center" justify="center" bg="$background" p="$5" gap="$4">
        <Text fontSize={64} fontWeight="700" color={brand[500]}>
          404
        </Text>
        <Text fontSize={22} fontWeight="600" color="$color">
          Page not found
        </Text>
        <Text color="$gray10" text="center" maxW={360}>
          We can&apos;t find the page you are looking for. It may have been moved or never existed.
        </Text>
        <Link href="/" asChild>
          <Button bg={brand[500]} color="#fff" rounded={8} px="$5" height={44}>
            Back to Home
          </Button>
        </Link>
      </YStack>
    </>
  )
}
