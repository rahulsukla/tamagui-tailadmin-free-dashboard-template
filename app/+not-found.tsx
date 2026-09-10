import { Link, Stack } from 'expo-router'
import { Text, YStack } from 'tamagui'

import { AppButton } from '@/components/ui/Button'
import { Error404Art } from '@/components/ui/Error404Art'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found', headerShown: false }} />
      <YStack flex={1} items="center" justify="center" bg="$background" p="$6" gap="$4">
        <Text fontSize={36} fontWeight="700" color="$color" letterSpacing={-0.5}>
          ERROR
        </Text>
        <Error404Art />
        <Text text="center" fontSize={16} color="$gray10" maxW={420}>
          We can&apos;t seem to find the page you are looking for!
        </Text>
        <Link href="/" asChild>
          <AppButton variant="outline" size="md">
            Back to Home Page
          </AppButton>
        </Link>
        <Text position="absolute" b={24} fontSize={13} color="$gray10">
          © {new Date().getFullYear()} - TailAdmin Tamagui
        </Text>
      </YStack>
    </>
  )
}
