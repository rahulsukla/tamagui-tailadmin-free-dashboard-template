import { Text, XStack, YStack } from 'tamagui'

import { AppInput } from '@/components/form/Input'
import { Label } from '@/components/form/Label'
import { AppSelect } from '@/components/form/Select'
import { ComponentCard } from '@/components/ui/ComponentCard'

const countries = [
  { value: 'US', label: '+1' },
  { value: 'GB', label: '+44' },
  { value: 'CA', label: '+1' },
  { value: 'AU', label: '+61' },
]

export function InputGroup() {
  return (
    <ComponentCard title="Input Group">
      <YStack gap="$4">
        <YStack>
          <Label>Email</Label>
          <XStack position="relative" width="100%" items="center">
            <AppInput placeholder="info@gmail.com" paddingLeft={62} />
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
              <Text color="$gray10">✉</Text>
            </XStack>
          </XStack>
        </YStack>
        <YStack>
          <Label>Phone</Label>
          <XStack gap="$2" width="100%">
            <YStack width={100}>
              <AppSelect options={countries} defaultValue="US" />
            </YStack>
            <YStack flex={1}>
              <AppInput placeholder="+1 (555) 000-0000" keyboardType="phone-pad" />
            </YStack>
          </XStack>
        </YStack>
        <YStack>
          <Label>Phone (code end)</Label>
          <XStack gap="$2" width="100%">
            <YStack flex={1}>
              <AppInput placeholder="+1 (555) 000-0000" keyboardType="phone-pad" />
            </YStack>
            <YStack width={100}>
              <AppSelect options={countries} defaultValue="GB" />
            </YStack>
          </XStack>
        </YStack>
      </YStack>
    </ComponentCard>
  )
}
