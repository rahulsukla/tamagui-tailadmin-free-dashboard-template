import { useState } from 'react'
import { Text, YStack } from 'tamagui'

import { AppTextArea } from '@/components/form/TextArea'
import { Label } from '@/components/form/Label'
import { ComponentCard } from '@/components/ui/ComponentCard'

export function TextAreaInput() {
  const [message, setMessage] = useState('')
  const [errorMsg, setErrorMsg] = useState('Description cannot be empty.')

  return (
    <ComponentCard title="Textarea input field">
      <YStack gap="$4">
        <YStack>
          <Label>Description</Label>
          <AppTextArea value={message} onChangeText={setMessage} />
        </YStack>
        <YStack>
          <Label>Description (error)</Label>
          <AppTextArea
            value={errorMsg}
            onChangeText={setErrorMsg}
            error
            hint="Please enter a message."
          />
        </YStack>
        <YStack>
          <Label>Description (disabled)</Label>
          <AppTextArea disabled value="Disabled textarea" />
          <Text mt="$2" fontSize={12} color="$gray10">
            This field is disabled.
          </Text>
        </YStack>
      </YStack>
    </ComponentCard>
  )
}
