import Svg, { Rect } from 'react-native-svg'

import { useTemplateConfig } from '@/context/TemplateConfigContext'

/** TailAdmin-style 404 glyph (react-native-svg; works on web + native). */
export function Error404Art({ width = 280, height = 94 }: { width?: number; height?: number }) {
  const { brandColor } = useTemplateConfig()
  const fill = brandColor

  return (
    <Svg width={width} height={height} viewBox="0 0 472 158" fill="none">
      <Rect x="203.103" y="41.7015" width="22.1453" height="20.7141" rx="2.63433" fill={fill} />
      <Rect x="246.752" y="41.7015" width="22.1453" height="20.7141" rx="2.63433" fill={fill} />
      <Rect x="258.201" y="98.2303" width="22.1453" height="20.7141" rx="2.63433" fill={fill} />
      <Rect x="191.654" y="98.2303" width="22.1453" height="20.7141" rx="2.63433" fill={fill} />
      <Rect x="207.396" y="82.847" width="57.5655" height="20.7141" rx="2.63433" fill={fill} />
      <Rect
        x="152.769"
        y="15.167"
        width="166.462"
        height="130.311"
        rx="28"
        stroke={fill}
        strokeWidth="24"
      />
      <Rect x="0.0405273" y="0.522461" width="32.6255" height="77.5957" rx="6.26271" fill={fill} />
      <Rect x="75.8726" y="3.16748" width="32.6255" height="154.31" rx="6.26271" fill={fill} />
      <Rect
        x="16.7939"
        y="91.3442"
        width="32.6255"
        height="77.5957"
        rx="6.26271"
        transform="rotate(-90 16.7939 91.3442)"
        fill={fill}
      />
      <Rect x="363.502" y="0.522461" width="32.6255" height="77.5957" rx="6.26271" fill={fill} />
      <Rect x="439.334" y="3.16748" width="32.6255" height="154.31" rx="6.26271" fill={fill} />
      <Rect
        x="380.255"
        y="91.3442"
        width="32.6255"
        height="77.5957"
        rx="6.26271"
        transform="rotate(-90 380.255 91.3442)"
        fill={fill}
      />
    </Svg>
  )
}
