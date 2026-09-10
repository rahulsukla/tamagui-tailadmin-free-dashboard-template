import { Link } from 'expo-router'
import { Text, YStack } from 'tamagui'

import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { AppButton } from '@/components/ui/Button'
import { Error404Art } from '@/components/ui/Error404Art'

export default function Error404Page() {
  return (
    <YStack gap="$5" flex={1}>
      <PageBreadcrumb pageTitle="404 Error" />
      <YStack
        rounded={16}
        borderWidth={1}
        borderColor="$borderColor"
        bg="$backgroundStrong"
        p="$8"
        items="center"
        gap="$4"
        minH={420}
        justify="center"
      >
        <Text fontSize={36} fontWeight="700" color="$color">
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
      </YStack>
    </YStack>
  )
}
