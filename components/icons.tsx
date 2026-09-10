import Svg, { Circle, Path, Rect } from 'react-native-svg'
import type { ColorValue } from 'react-native'

import type { NavIconName } from '@/navigation/navItems'

type IconProps = {
  name: NavIconName
  color?: ColorValue
  size?: number
}

export function NavIcon({ name, color = '#667085', size = 24 }: IconProps) {
  const stroke = color
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none' as const }

  switch (name) {
    case 'grid':
      return (
        <Svg {...common}>
          <Rect x="3" y="3" width="7" height="7" rx="1.5" stroke={stroke} strokeWidth={1.75} />
          <Rect x="14" y="3" width="7" height="7" rx="1.5" stroke={stroke} strokeWidth={1.75} />
          <Rect x="3" y="14" width="7" height="7" rx="1.5" stroke={stroke} strokeWidth={1.75} />
          <Rect x="14" y="14" width="7" height="7" rx="1.5" stroke={stroke} strokeWidth={1.75} />
        </Svg>
      )
    case 'calendar':
      return (
        <Svg {...common}>
          <Rect x="3" y="5" width="18" height="16" rx="2" stroke={stroke} strokeWidth={1.75} />
          <Path d="M3 10h18M8 3v4M16 3v4" stroke={stroke} strokeWidth={1.75} strokeLinecap="round" />
        </Svg>
      )
    case 'user':
      return (
        <Svg {...common}>
          <Circle cx="12" cy="8" r="3.5" stroke={stroke} strokeWidth={1.75} />
          <Path
            d="M5 19.5c1.8-3.2 4.2-4.8 7-4.8s5.2 1.6 7 4.8"
            stroke={stroke}
            strokeWidth={1.75}
            strokeLinecap="round"
          />
        </Svg>
      )
    case 'list':
      return (
        <Svg {...common}>
          <Path
            d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01"
            stroke={stroke}
            strokeWidth={1.75}
            strokeLinecap="round"
          />
        </Svg>
      )
    case 'table':
      return (
        <Svg {...common}>
          <Rect x="3" y="4" width="18" height="16" rx="2" stroke={stroke} strokeWidth={1.75} />
          <Path d="M3 9h18M3 14h18M9 9v11M15 9v11" stroke={stroke} strokeWidth={1.75} />
        </Svg>
      )
    case 'page':
      return (
        <Svg {...common}>
          <Path
            d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
            stroke={stroke}
            strokeWidth={1.75}
          />
          <Path d="M14 3v5h5" stroke={stroke} strokeWidth={1.75} />
        </Svg>
      )
    case 'chart':
      return (
        <Svg {...common}>
          <Path
            d="M4 19V5M4 19h16M8 16v-4M12 16V8M16 16v-7"
            stroke={stroke}
            strokeWidth={1.75}
            strokeLinecap="round"
          />
        </Svg>
      )
    case 'box':
      return (
        <Svg {...common}>
          <Path
            d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3z"
            stroke={stroke}
            strokeWidth={1.75}
            strokeLinejoin="round"
          />
          <Path d="M12 12 20 7.5M12 12v9M12 12 4 7.5" stroke={stroke} strokeWidth={1.75} />
        </Svg>
      )
    case 'plug':
      return (
        <Svg {...common}>
          <Path
            d="M9 7V3M15 7V3M7 7h10v4a5 5 0 0 1-5 5v5M12 16v5"
            stroke={stroke}
            strokeWidth={1.75}
            strokeLinecap="round"
          />
        </Svg>
      )
    case 'dots':
      return (
        <Svg {...common}>
          <Circle cx="6" cy="12" r="1.5" fill={stroke} />
          <Circle cx="12" cy="12" r="1.5" fill={stroke} />
          <Circle cx="18" cy="12" r="1.5" fill={stroke} />
        </Svg>
      )
    case 'chevron':
      return (
        <Svg {...common}>
          <Path
            d="M6 9l6 6 6-6"
            stroke={stroke}
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )
    default:
      return null
  }
}

export function SunIcon({ color = '#667085', size = 20 }: { color?: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx="10" cy="10" r="3.5" stroke={color} strokeWidth={1.5} />
      <Path
        d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M16 4l-1.4 1.4M5.4 14.6 4 16"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export function MoonIcon({ color = '#667085', size = 20 }: { color?: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M17.5 12.2A7.5 7.5 0 1 1 7.8 2.5 6 6 0 0 0 17.5 12.2z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function MenuIcon({ color = '#667085', size = 16 }: { color?: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size * 0.75} viewBox="0 0 16 12" fill="none">
      <Path
        d="M1.3 1h13.4M1.3 6h6.7M1.3 11h13.4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export function CloseIcon({ color = '#667085', size = 24 }: { color?: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.2 6.2 17.8 17.8M17.8 6.2 6.2 17.8"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    </Svg>
  )
}
