import { useState } from 'react'
import { YStack } from 'tamagui'

import { Checkbox } from '@/components/form/Checkbox'
import { ComponentCard } from '@/components/ui/ComponentCard'

export function CheckboxComponents() {
  const [a, setA] = useState(false)
  const [b, setB] = useState(true)
  const [c, setC] = useState(false)

  return (
    <ComponentCard title="Checkboxes">
      <YStack gap="$4">
        <Checkbox label="Default checkbox" checked={a} onChange={setA} />
        <Checkbox label="Checked checkbox" checked={b} onChange={setB} />
        <Checkbox label="Disabled checkbox" checked={c} onChange={setC} disabled />
      </YStack>
    </ComponentCard>
  )
}
