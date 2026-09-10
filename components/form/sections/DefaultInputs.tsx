import { useState } from 'react'
import { Pressable } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { AppInput } from '@/components/form/Input'
import { Label } from '@/components/form/Label'
import { AppSelect } from '@/components/form/Select'
import { ComponentCard } from '@/components/ui/ComponentCard'

const options = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'template', label: 'Template' },
  { value: 'development', label: 'Development' },
]

export function DefaultInputs() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <ComponentCard title="Default Inputs">
      <YStack gap="$4">
        <YStack>
          <Label>Input</Label>
          <AppInput />
        </YStack>
        <YStack>
          <Label>Input with Placeholder</Label>
          <AppInput placeholder="info@gmail.com" keyboardType="email-address" />
        </YStack>
        <YStack>
          <Label>Select Input</Label>
          <AppSelect options={options} placeholder="Select an option" />
        </YStack>
        <YStack>
          <Label>Password Input</Label>
          <XStack position="relative" width="100%" items="center">
            <AppInput
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
              paddingRight={48}
            />
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
        <YStack>
          <Label>Date Input</Label>
          <AppInput placeholder="Select a date (YYYY-MM-DD)" />
        </YStack>
        <YStack>
          <Label>Time Input</Label>
          <AppInput placeholder="HH:MM" />
        </YStack>
        <YStack>
          <Label>Input with Payment</Label>
          <XStack position="relative" width="100%" items="center">
            <AppInput placeholder="Card number" paddingLeft={62} />
            <XStack
              position="absolute"
              l={0}
              height={44}
              width={46}
              items="center"
              justify="center"
              borderRightWidth={1}
              borderColor="$borderColor"
            >
              <Text fontSize={12} fontWeight="700" color="#E80B26">
                ●●
              </Text>
            </XStack>
          </XStack>
        </YStack>
      </YStack>
    </ComponentCard>
  )
}
