import { useWindowDimensions } from 'react-native'
import { XStack, YStack } from 'tamagui'

import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { CheckboxComponents } from '@/components/form/sections/CheckboxComponents'
import { DefaultInputs } from '@/components/form/sections/DefaultInputs'
import { DropzoneComponent } from '@/components/form/sections/Dropzone'
import { FileInputExample } from '@/components/form/sections/FileInputExample'
import { InputGroup } from '@/components/form/sections/InputGroup'
import { InputStates } from '@/components/form/sections/InputStates'
import { RadioButtons } from '@/components/form/sections/RadioButtons'
import { SelectInputs } from '@/components/form/sections/SelectInputs'
import { TextAreaInput } from '@/components/form/sections/TextAreaInput'
import { ToggleSwitch } from '@/components/form/sections/ToggleSwitch'

export default function FormElementsPage() {
  const { width } = useWindowDimensions()
  const twoCol = width >= 1280

  return (
    <YStack gap={20} flex={1} width="100%">
      <PageBreadcrumb pageTitle="Form Elements" />
      <XStack
        flexDirection={twoCol ? 'row' : 'column'}
        gap={20}
        width="100%"
        items="flex-start"
      >
        <YStack flex={1} width={twoCol ? undefined : '100%'} gap={20} minW={0}>
          <DefaultInputs />
          <SelectInputs />
          <TextAreaInput />
          <InputStates />
        </YStack>
        <YStack flex={1} width={twoCol ? undefined : '100%'} gap={20} minW={0}>
          <InputGroup />
          <FileInputExample />
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent />
        </YStack>
      </XStack>
    </YStack>
  )
}
