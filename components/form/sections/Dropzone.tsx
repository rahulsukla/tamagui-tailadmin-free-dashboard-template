import { useRef, useState } from 'react'
import { Platform, Pressable, View } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { Text, YStack } from 'tamagui'

import { ComponentCard } from '@/components/ui/ComponentCard'
import { useTemplateConfig } from '@/context/TemplateConfigContext'

const IMAGE_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/svg+xml',
] as const

type WebDragEvent = {
  preventDefault: () => void
  stopPropagation: () => void
  dataTransfer?: { files?: FileList | null }
}

function isAcceptedImage(file: { type?: string; name?: string }) {
  const type = (file.type ?? '').toLowerCase()
  if (type && IMAGE_MIME_TYPES.includes(type as (typeof IMAGE_MIME_TYPES)[number])) {
    return true
  }
  if (type.startsWith('image/')) return true
  const name = (file.name ?? '').toLowerCase()
  return /\.(png|jpe?g|webp|svg)$/.test(name)
}

export function DropzoneComponent() {
  const [active, setActive] = useState(false)
  const [files, setFiles] = useState<string[]>([])
  const [picking, setPicking] = useState(false)
  const { brandColor } = useTemplateConfig()
  const dragDepth = useRef(0)

  const setSelectedNames = (names: string[]) => {
    if (names.length) setFiles(names)
  }

  const pickFiles = async () => {
    if (picking) return
    setPicking(true)
    setActive(true)
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [...IMAGE_MIME_TYPES],
        multiple: true,
        copyToCacheDirectory: true,
      })
      if (!result.canceled && result.assets?.length) {
        setSelectedNames(result.assets.map((asset) => asset.name))
      }
    } finally {
      setPicking(false)
      setActive(false)
    }
  }

  const webDnDProps =
    Platform.OS === 'web'
      ? ({
          onDragEnter: (event: WebDragEvent) => {
            event.preventDefault()
            event.stopPropagation()
            dragDepth.current += 1
            setActive(true)
          },
          onDragLeave: (event: WebDragEvent) => {
            event.preventDefault()
            event.stopPropagation()
            dragDepth.current = Math.max(0, dragDepth.current - 1)
            if (dragDepth.current === 0) setActive(false)
          },
          onDragOver: (event: WebDragEvent) => {
            event.preventDefault()
            event.stopPropagation()
          },
          onDrop: (event: WebDragEvent) => {
            event.preventDefault()
            event.stopPropagation()
            dragDepth.current = 0
            setActive(false)
            const dropped = event.dataTransfer?.files
            if (!dropped?.length) return
            const accepted = Array.from(dropped).filter(isAcceptedImage)
            const names = (accepted.length ? accepted : Array.from(dropped)).map(
              (file) => file.name
            )
            setSelectedNames(names)
          },
        } as Record<string, unknown>)
      : null

  return (
    <ComponentCard title="Dropzone">
      <View {...webDnDProps}>
        <YStack
          borderWidth={1}
          borderStyle="dashed"
          borderColor={active ? (brandColor as any) : '$borderColor'}
          bg={active ? '$accentBackground' : '$backgroundStrong'}
          rounded={12}
          p="$6"
          items="center"
          gap="$3"
          opacity={picking ? 0.75 : 1}
          hoverStyle={Platform.OS === 'web' ? { borderColor: brandColor as any } : undefined}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Upload images. Drag and drop or browse files."
            disabled={picking}
            onPress={pickFiles}
            style={{ width: '100%' }}
          >
            <YStack items="center" gap="$3" width="100%" cursor="pointer">
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
                {Platform.OS === 'web' ? 'Drag & drop files here' : 'Tap to choose files'}
              </Text>
              <Text fontSize={13} color="$gray10" text="center">
                {Platform.OS === 'web'
                  ? 'Drag and drop your PNG, JPG, WebP, SVG images here or browse'
                  : 'Choose PNG, JPG, WebP, or SVG images from your device'}
              </Text>
            </YStack>
          </Pressable>

          {files.length ? (
            <YStack gap="$2" items="center" width="100%">
              <Text fontSize={12} color={brandColor as any} text="center">
                Selected: {files.join(', ')}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Clear selected files"
                hitSlop={8}
                onPress={() => setFiles([])}
              >
                <Text
                  fontSize={12}
                  fontWeight="600"
                  color="$gray11"
                  textDecorationLine="underline"
                >
                  Clear
                </Text>
              </Pressable>
            </YStack>
          ) : null}
        </YStack>
      </View>
    </ComponentCard>
  )
}
