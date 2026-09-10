import { useState } from 'react'
import { YStack } from 'tamagui'

import { Radio } from '@/components/form/Radio'
import { ComponentCard } from '@/components/ui/ComponentCard'

export function RadioButtons() {
  const [value, setValue] = useState('free')

  return (
    <ComponentCard title="Radio Buttons">
      <YStack gap="$4">
        <Radio
          label="Default radio"
          checked={value === 'free'}
          onChange={() => setValue('free')}
        />
        <Radio
          label="Selected radio"
          checked={value === 'pro'}
          onChange={() => setValue('pro')}
        />
        <Radio label="Disabled radio" checked={false} onChange={() => {}} disabled />
      </YStack>
    </ComponentCard>
  )
}
