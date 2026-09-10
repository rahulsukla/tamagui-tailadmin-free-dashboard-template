import { YStack } from 'tamagui'

import { AppInput } from '@/components/form/Input'
import { Label } from '@/components/form/Label'
import { ComponentCard } from '@/components/ui/ComponentCard'

export function InputStates() {
  return (
    <ComponentCard title="Input States">
      <YStack gap="$4">
        <YStack>
          <Label>Error</Label>
          <AppInput
            defaultValue="error@gmail.com"
            error
            hint="This is an error message."
          />
        </YStack>
        <YStack>
          <Label>Success</Label>
          <AppInput
            defaultValue="success@gmail.com"
            success
            hint="This is a success message."
          />
        </YStack>
        <YStack>
          <Label>Disabled</Label>
          <AppInput defaultValue="disabled@gmail.com" disabled />
        </YStack>
      </YStack>
    </ComponentCard>
  )
}
