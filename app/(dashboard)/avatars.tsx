import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { Avatar } from '@/components/ui/Avatar'
import { ComponentCard } from '@/components/ui/ComponentCard'
import { XStack, YStack } from 'tamagui'

const user = require('@/assets/demo/user/john-doe.png')
const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'] as const

export default function AvatarsPage() {
  return (
    <YStack gap="$5" flex={1}>
      <PageBreadcrumb pageTitle="Avatars" />

      <ComponentCard title="Default Avatar">
        <XStack flexWrap="wrap" items="center" justify="center" gap="$5">
          {sizes.map((size) => (
            <Avatar key={size} source={user} size={size} />
          ))}
        </XStack>
      </ComponentCard>

      <ComponentCard title="Avatar with online indicator">
        <XStack flexWrap="wrap" items="center" justify="center" gap="$5">
          {sizes.map((size) => (
            <Avatar key={size} source={user} size={size} status="online" />
          ))}
        </XStack>
      </ComponentCard>

      <ComponentCard title="Avatar with Offline indicator">
        <XStack flexWrap="wrap" items="center" justify="center" gap="$5">
          {sizes.map((size) => (
            <Avatar key={size} source={user} size={size} status="offline" />
          ))}
        </XStack>
      </ComponentCard>

      <ComponentCard title="Avatar with busy indicator">
        <XStack flexWrap="wrap" items="center" justify="center" gap="$5">
          {sizes.map((size) => (
            <Avatar key={size} source={user} size={size} status="busy" />
          ))}
        </XStack>
      </ComponentCard>
    </YStack>
  )
}
