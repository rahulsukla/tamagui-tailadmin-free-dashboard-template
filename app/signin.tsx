import { Link } from 'expo-router'
import { Button, Input, Text, YStack } from 'tamagui'

import { brand } from '@/theme/colors'

export default function SignIn() {
  return (
    <YStack flex={1} items="center" justify="center" bg="$background" p="$5" gap="$4">
      <YStack
        width="100%"
        maxW={420}
        bg="$backgroundStrong"
        borderWidth={1}
        borderColor="$borderColor"
        rounded={16}
        p="$5"
        gap="$4"
      >
        <Text fontSize={28} fontWeight="700" color="$color" letterSpacing={-0.4}>
          Sign In
        </Text>
        <Text color="$gray10" fontSize={14}>
          Enter your email and password to sign in (UI shell).
        </Text>
        <YStack gap="$2">
          <Text fontSize={14} fontWeight="500" color="$color">
            Email
          </Text>
          <Input
            placeholder="you@example.com"
            borderColor="$borderColor"
            bg="$background"
            height={44}
            rounded={8}
          />
        </YStack>
        <YStack gap="$2">
          <Text fontSize={14} fontWeight="500" color="$color">
            Password
          </Text>
          <Input
            secureTextEntry
            placeholder="••••••••"
            borderColor="$borderColor"
            bg="$background"
            height={44}
            rounded={8}
          />
        </YStack>
        <Button bg={brand[500]} height={44} rounded={8} color="#fff" fontWeight="600">
          Sign In
        </Button>
        <Link href="/signup" asChild>
          <Text color={brand[500]} text="center" fontSize={14}>
            Don&apos;t have an account? Sign Up
          </Text>
        </Link>
        <Link href="/" asChild>
          <Text color="$gray10" text="center" fontSize={13}>
            Back to dashboard
          </Text>
        </Link>
      </YStack>
    </YStack>
  )
}
