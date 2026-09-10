import { Text } from 'tamagui'

import { PageShell } from '@/components/PageShell'

function Placeholder({ name }: { name: string }) {
  return (
    <PageShell title={name}>
      <Text color="$gray10" fontSize={14}>
        {name} — ported UI coming in a later phase. Shell, routing, and theme are ready.
      </Text>
    </PageShell>
  )
}

export default function CalendarPage() {
  return <Placeholder name="Calendar" />
}
