import { useCallback, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'

/** Measure a container’s width for charts/tables that must fill the card, not the viewport. */
export function useContainerWidth(initial = 0) {
  const [width, setWidth] = useState(initial)
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const next = Math.round(e.nativeEvent.layout.width)
    if (next > 0) setWidth(next)
  }, [])
  return { width, onLayout }
}
