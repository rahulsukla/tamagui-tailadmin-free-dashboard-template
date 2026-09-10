export type NavSubItem = {
  name: string
  href: string
}

export type NavItem = {
  name: string
  icon: NavIconName
  href?: string
  subItems?: NavSubItem[]
}

export type NavIconName =
  | 'grid'
  | 'calendar'
  | 'user'
  | 'list'
  | 'table'
  | 'page'
  | 'chart'
  | 'box'
  | 'plug'
  | 'dots'
  | 'chevron'

export const mainNav: NavItem[] = [
  {
    name: 'Dashboard',
    icon: 'grid',
    subItems: [{ name: 'Ecommerce', href: '/' }],
  },
  { name: 'Calendar', icon: 'calendar', href: '/calendar' },
  { name: 'User Profile', icon: 'user', href: '/profile' },
  {
    name: 'Forms',
    icon: 'list',
    subItems: [{ name: 'Form Elements', href: '/form-elements' }],
  },
  {
    name: 'Tables',
    icon: 'table',
    subItems: [
      { name: 'Basic Tables', href: '/basic-tables' },
      { name: 'Documents', href: '/documents' },
    ],
  },
  {
    name: 'Pages',
    icon: 'page',
    subItems: [
      { name: 'Landing', href: '/landing' },
      { name: 'Blank Page', href: '/blank' },
      { name: '404 Error', href: '/error-404' },
    ],
  },
]

export const othersNav: NavItem[] = [
  {
    name: 'Charts',
    icon: 'chart',
    subItems: [
      { name: 'Line Chart', href: '/line-chart' },
      { name: 'Bar Chart', href: '/bar-chart' },
    ],
  },
  {
    name: 'UI Elements',
    icon: 'box',
    subItems: [
      { name: 'Alerts', href: '/alerts' },
      { name: 'Avatar', href: '/avatars' },
      { name: 'Badge', href: '/badge' },
      { name: 'Buttons', href: '/buttons' },
      { name: 'Cards', href: '/cards' },
      { name: 'Images', href: '/images' },
      { name: 'Videos', href: '/videos' },
      { name: 'Progress', href: '/progress' },
    ],
  },
  {
    name: 'Authentication',
    icon: 'plug',
    subItems: [
      { name: 'Sign In', href: '/signin' },
      { name: 'Sign Up', href: '/signup' },
    ],
  },
]
