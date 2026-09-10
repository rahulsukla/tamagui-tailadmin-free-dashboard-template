import { Text } from 'tamagui'

import { PageShell } from '@/components/PageShell'

export default function Page() {
  return (
    <PageShell title="User Profile">
      <Text color="$gray10" fontSize={14}>
        User Profile — content ported in a later phase. Navigation and theme shell are live.
      </Text>
    </PageShell>
  )
}
