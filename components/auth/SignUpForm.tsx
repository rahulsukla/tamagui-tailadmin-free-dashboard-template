import { useState } from 'react'
import { Link } from 'expo-router'
import { Pressable } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { Checkbox } from '@/components/form/Checkbox'
import { AppInput } from '@/components/form/Input'
import { Label } from '@/components/form/Label'
import { AppButton } from '@/components/ui/Button'
import { error } from '@/theme/colors'

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [agree, setAgree] = useState(false)

  return (
    <YStack width="100%" maxW={420} self="center" gap="$5">
      <Link href="/" asChild>
        <Text color="$gray10" fontSize={14}>
          ← Back to dashboard
        </Text>
      </Link>

      <YStack gap="$2">
        <Text fontSize={28} fontWeight="600" color="$color" letterSpacing={-0.4}>
          Sign Up
        </Text>
        <Text fontSize={14} color="$gray10">
          Enter your email and password to sign up!
        </Text>
      </YStack>

      <XStack gap="$3" flexWrap="wrap">
        <AppButton variant="outline" size="md">
          Sign up with Google
        </AppButton>
        <AppButton variant="outline" size="md">
          Sign up with X
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
        <XStack gap="$3" flexWrap="wrap">
          <YStack flex={1} minW={140}>
            <Label>
              First Name <Text color={error[500] as any}>*</Text>
            </Label>
            <AppInput placeholder="Enter your first name" />
          </YStack>
          <YStack flex={1} minW={140}>
            <Label>
              Last Name <Text color={error[500] as any}>*</Text>
            </Label>
            <AppInput placeholder="Enter your last name" />
          </YStack>
        </XStack>
        <YStack>
          <Label>
            Email <Text color={error[500] as any}>*</Text>
          </Label>
          <AppInput placeholder="Enter your email" keyboardType="email-address" />
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

        <Checkbox
          label="By creating an account you agree to terms & conditions"
          checked={agree}
          onChange={setAgree}
        />

        <AppButton variant="primary" size="md">
          Sign Up
        </AppButton>

        <Text text="center" fontSize={14} color="$gray10">
          Already have an account?{' '}
          <Link href="/signin">
            <Text color="$blue10" fontWeight="500">
              Sign In
            </Text>
          </Link>
        </Text>
      </YStack>
    </YStack>
  )
}
