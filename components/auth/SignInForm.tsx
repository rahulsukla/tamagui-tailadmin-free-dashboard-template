import { useState } from 'react'
import { Link } from 'expo-router'
import { Pressable } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { Checkbox } from '@/components/form/Checkbox'
import { AppInput } from '@/components/form/Input'
import { Label } from '@/components/form/Label'
import { AppButton } from '@/components/ui/Button'
import { error } from '@/theme/colors'

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  return (
    <YStack width="100%" maxW={420} self="center" gap="$5">
      <Link href="/" asChild>
        <Text color="$gray10" fontSize={14}>
          ← Back to dashboard
        </Text>
      </Link>

      <YStack gap="$2">
        <Text fontSize={28} fontWeight="600" color="$color" letterSpacing={-0.4}>
          Sign In
        </Text>
        <Text fontSize={14} color="$gray10">
          Enter your email and password to sign in!
        </Text>
      </YStack>

      <XStack gap="$3" flexWrap="wrap">
        <AppButton variant="outline" size="md">
          Sign in with Google
        </AppButton>
        <AppButton variant="outline" size="md">
          Sign in with X
        </AppButton>
      </XStack>

      <XStack items="center" gap="$3">
        <YStack flex={1} height={1} bg="$borderColor" />
        <Text color="$gray8" fontSize={13}>
          Or
        </Text>
        <YStack flex={1} height={1} bg="$borderColor" />
      </XStack>

      <YStack gap="$4">
        <YStack>
          <Label>
            Email <Text color={error[500] as any}>*</Text>
          </Label>
          <AppInput placeholder="info@gmail.com" keyboardType="email-address" />
        </YStack>
        <YStack>
          <Label>
            Password <Text color={error[500] as any}>*</Text>
          </Label>
          <XStack position="relative" width="100%">
            <YStack flex={1}>
              <AppInput
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
                paddingRight={56}
              />
            </YStack>
            <Pressable
              onPress={() => setShowPassword((v) => !v)}
              style={{ position: 'absolute', right: 14, top: 12 }}
            >
              <Text color="$gray10" fontSize={13}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          </XStack>
        </YStack>

        <XStack items="center" justify="space-between" gap="$3" flexWrap="wrap">
          <Checkbox
            label="Keep me logged in"
            checked={remember}
            onChange={setRemember}
          />
          <Text fontSize={14} color="$blue10" fontWeight="500">
            Forgot password?
          </Text>
        </XStack>

        <AppButton variant="primary" size="md">
          Sign in
        </AppButton>

        <Text text="center" fontSize={14} color="$gray10">
          Don&apos;t have an account?{' '}
          <Link href="/signup">
            <Text color="$blue10" fontWeight="500">
              Sign Up
            </Text>
          </Link>
        </Text>
      </YStack>
    </YStack>
  )
}
