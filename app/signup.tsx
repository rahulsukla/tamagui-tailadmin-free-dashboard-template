import { Link } from 'expo-router'
import { Button, Input, Text, YStack } from 'tamagui'

import { brand } from '@/theme/colors'

export default function SignUp() {
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
          Sign Up
        </Text>
        <Text color="$gray10" fontSize={14}>
          Create an account to get started (UI shell).
        </Text>
        <Input placeholder="Full name" borderColor="$borderColor" bg="$background" height={44} rounded={8} />
        <Input placeholder="Email" borderColor="$borderColor" bg="$background" height={44} rounded={8} />
        <Input
          secureTextEntry
          placeholder="Password"
          borderColor="$borderColor"
          bg="$background"
          height={44}
          rounded={8}
        />
        <Button bg={brand[500]} height={44} rounded={8} color="#fff" fontWeight="600">
          Sign Up
        </Button>
        <Link href="/signin" asChild>
          <Text color={brand[500]} text="center" fontSize={14}>
            Already have an account? Sign In
          </Text>
        </Link>
      </YStack>
    </YStack>
  )
}
