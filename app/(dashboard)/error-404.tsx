import { Text } from 'tamagui'

import { PageShell } from '@/components/PageShell'

export default function Page() {
  return (
    <PageShell title="404 Error">
      <Text color="$gray10" fontSize={14}>
        404 Error — content ported in a later phase. Navigation and theme shell are live.
      </Text>
    </PageShell>
  )
}
