import { YStack } from 'tamagui'

import { Switch } from '@/components/form/Switch'
import { ComponentCard } from '@/components/ui/ComponentCard'

export function ToggleSwitch() {
  return (
    <ComponentCard title="Toggle switch input">
      <YStack gap="$4">
        <Switch label="Default" />
        <Switch label="Checked" defaultChecked />
        <Switch label="Disabled" disabled />
        <Switch label="Gray theme" color="gray" defaultChecked />
      </YStack>
    </ComponentCard>
  )
}
