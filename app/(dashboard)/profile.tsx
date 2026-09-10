import { YStack, Text } from 'tamagui'

import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { UserAddressCard } from '@/components/profile/UserAddressCard'
import { UserInfoCard } from '@/components/profile/UserInfoCard'
import { UserMetaCard } from '@/components/profile/UserMetaCard'

export default function ProfilePage() {
  return (
    <YStack gap="$5" flex={1}>
      <PageBreadcrumb pageTitle="Profile" />
      <YStack
        rounded={16}
        borderWidth={1}
        borderColor="$borderColor"
        bg="$backgroundStrong"
        p="$5"
        gap="$5"
      >
        <Text fontSize={18} fontWeight="600" color="$color">
          Profile
        </Text>
        <UserMetaCard />
        <UserInfoCard />
        <UserAddressCard />
      </YStack>
    </YStack>
  )
}
