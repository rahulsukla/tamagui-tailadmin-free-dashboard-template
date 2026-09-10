import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { Badge, PlusGlyph } from '@/components/ui/Badge'
import { ComponentCard } from '@/components/ui/ComponentCard'
import { XStack, YStack } from 'tamagui'

const colors = ['primary', 'success', 'error', 'warning', 'info', 'light', 'dark'] as const

export default function BadgesPage() {
  return (
    <YStack gap="$5" flex={1}>
      <PageBreadcrumb pageTitle="Badges" />

      <ComponentCard title="With Light Background">
        <XStack flexWrap="wrap" gap="$4" items="center" justify="center">
          {colors.map((color) => (
            <Badge key={color} variant="light" color={color}>
              {color[0].toUpperCase() + color.slice(1)}
            </Badge>
          ))}
        </XStack>
      </ComponentCard>

      <ComponentCard title="With Solid Background">
        <XStack flexWrap="wrap" gap="$4" items="center" justify="center">
          {colors.map((color) => (
            <Badge key={color} variant="solid" color={color}>
              {color[0].toUpperCase() + color.slice(1)}
            </Badge>
          ))}
        </XStack>
      </ComponentCard>

      <ComponentCard title="Light Background with Left Icon">
        <XStack flexWrap="wrap" gap="$4" items="center" justify="center">
          {colors.map((color) => (
            <Badge
              key={color}
              variant="light"
              color={color}
              startIcon={<PlusGlyph />}
            >
              {color[0].toUpperCase() + color.slice(1)}
            </Badge>
          ))}
        </XStack>
      </ComponentCard>

      <ComponentCard title="Solid Background with Left Icon">
        <XStack flexWrap="wrap" gap="$4" items="center" justify="center">
          {colors.map((color) => (
            <Badge
              key={color}
              variant="solid"
              color={color}
              startIcon={<PlusGlyph color="#fff" />}
            >
              {color[0].toUpperCase() + color.slice(1)}
            </Badge>
          ))}
        </XStack>
      </ComponentCard>

      <ComponentCard title="Light Background with Right Icon">
        <XStack flexWrap="wrap" gap="$4" items="center" justify="center">
          {colors.map((color) => (
            <Badge key={color} variant="light" color={color} endIcon={<PlusGlyph />}>
              {color[0].toUpperCase() + color.slice(1)}
            </Badge>
          ))}
        </XStack>
      </ComponentCard>

      <ComponentCard title="Solid Background with Right Icon">
        <XStack flexWrap="wrap" gap="$4" items="center" justify="center">
          {colors.map((color) => (
            <Badge
              key={color}
              variant="solid"
              color={color}
              endIcon={<PlusGlyph color="#fff" />}
            >
              {color[0].toUpperCase() + color.slice(1)}
            </Badge>
          ))}
        </XStack>
      </ComponentCard>
    </YStack>
  )
}
