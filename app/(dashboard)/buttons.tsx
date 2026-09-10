import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { AppButton, BoxIcon } from '@/components/ui/Button'
import { ComponentCard } from '@/components/ui/ComponentCard'
import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { XStack, YStack } from 'tamagui'

export default function ButtonsPage() {
  const { brandColor } = useTemplateConfig()
  return (
    <YStack gap="$5" flex={1}>
      <PageBreadcrumb pageTitle="Buttons" />

      <ComponentCard title="Primary Button">
        <XStack items="center" gap="$5" flexWrap="wrap">
          <AppButton size="sm" variant="primary">
            Button Text
          </AppButton>
          <AppButton size="md" variant="primary">
            Button Text
          </AppButton>
        </XStack>
      </ComponentCard>

      <ComponentCard title="Primary Button with Left Icon">
        <XStack items="center" gap="$5" flexWrap="wrap">
          <AppButton size="sm" variant="primary" startIcon={<BoxIcon color="#fff" />}>
            Button Text
          </AppButton>
          <AppButton size="md" variant="primary" startIcon={<BoxIcon color="#fff" />}>
            Button Text
          </AppButton>
        </XStack>
      </ComponentCard>

      <ComponentCard title="Primary Button with Right Icon">
        <XStack items="center" gap="$5" flexWrap="wrap">
          <AppButton size="sm" variant="primary" endIcon={<BoxIcon color="#fff" />}>
            Button Text
          </AppButton>
          <AppButton size="md" variant="primary" endIcon={<BoxIcon color="#fff" />}>
            Button Text
          </AppButton>
        </XStack>
      </ComponentCard>

      <ComponentCard title="Secondary Button">
        <XStack items="center" gap="$5" flexWrap="wrap">
          <AppButton size="sm" variant="outline">
            Button Text
          </AppButton>
          <AppButton size="md" variant="outline">
            Button Text
          </AppButton>
        </XStack>
      </ComponentCard>

      <ComponentCard title="Outline Button with Left Icon">
        <XStack items="center" gap="$5" flexWrap="wrap">
          <AppButton
            size="sm"
            variant="outline"
            startIcon={<BoxIcon color={brandColor} />}
          >
            Button Text
          </AppButton>
          <AppButton
            size="md"
            variant="outline"
            startIcon={<BoxIcon color={brandColor} />}
          >
            Button Text
          </AppButton>
        </XStack>
      </ComponentCard>

      <ComponentCard title="Outline Button with Right Icon">
        <XStack items="center" gap="$5" flexWrap="wrap">
          <AppButton
            size="sm"
            variant="outline"
            endIcon={<BoxIcon color={brandColor} />}
          >
            Button Text
          </AppButton>
          <AppButton
            size="md"
            variant="outline"
            endIcon={<BoxIcon color={brandColor} />}
          >
            Button Text
          </AppButton>
        </XStack>
      </ComponentCard>
    </YStack>
  )
}
