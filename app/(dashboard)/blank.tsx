import { Text } from 'tamagui'

import { PageShell } from '@/components/PageShell'

export default function BlankPage() {
  return (
    <PageShell title="Blank Page">
      <Text color="$gray10" fontSize={14}>
        Start putting content on grids or panels — this page mirrors TailAdmin&apos;s blank starter.
      </Text>
    </PageShell>
  )
}
