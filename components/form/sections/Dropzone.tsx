import { useState } from 'react'
import { Pressable } from 'react-native'
import { Text, YStack } from 'tamagui'

import { ComponentCard } from '@/components/ui/ComponentCard'
import { useTemplateConfig } from '@/context/TemplateConfigContext'

export function DropzoneComponent() {
  const [active, setActive] = useState(false)
  const [files, setFiles] = useState<string[]>([])
  const { brandColor } = useTemplateConfig()

  return (
    <ComponentCard title="Dropzone">
      <Pressable
        onPress={() => {
          setActive(true)
          setFiles(['demo-upload.png'])
          setTimeout(() => setActive(false), 400)
        }}
      >
        <YStack
          borderWidth={1}
          borderStyle="dashed"
          borderColor={active ? (brandColor as any) : '$borderColor'}
          bg={active ? '$accentBackground' : '$background'}
          rounded={12}
          p="$6"
          items="center"
          gap="$3"
        >
          <YStack
            width={68}
            height={68}
            rounded={999}
            bg="$gray3"
            items="center"
            justify="center"
          >
            <Text fontSize={28} color="$gray10">
              ↑
            </Text>
          </YStack>
          <Text fontSize={14} fontWeight="600" color="$color" text="center">
            Drag & drop files here
          </Text>
          <Text fontSize={13} color="$gray10" text="center">
            Drag and drop your PNG, JPG, WebP, SVG images here or browse
          </Text>
          {files.length ? (
            <Text fontSize={12} color={brandColor as any}>
              Selected: {files.join(', ')}
            </Text>
          ) : null}
        </YStack>
      </Pressable>
    </ComponentCard>
  )
}
