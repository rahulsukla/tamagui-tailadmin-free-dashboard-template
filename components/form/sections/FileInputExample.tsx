import { useState } from 'react'
import { YStack } from 'tamagui'

import { AppInput } from '@/components/form/Input'
import { Label } from '@/components/form/Label'
import { ComponentCard } from '@/components/ui/ComponentCard'

export function FileInputExample() {
  const [name, setName] = useState('')

  return (
    <ComponentCard title="File Input">
      <YStack>
        <Label>Upload file</Label>
        <AppInput
          placeholder="Choose a file path / name"
          value={name}
          onChangeText={setName}
        />
      </YStack>
    </ComponentCard>
  )
}
