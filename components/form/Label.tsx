import type { ReactNode } from 'react'
import { Label as TLabel } from 'tamagui'

export function Label({ children }: { children: ReactNode }) {
  return (
    <TLabel
      unstyled
      mb={6}
      fontSize={14}
      fontWeight="500"
      color="$gray11"
      display="flex"
    >
      {children}
    </TLabel>
  )
}
