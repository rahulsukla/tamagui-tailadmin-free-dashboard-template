import { Link, usePathname, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Platform, ScrollView, useWindowDimensions } from 'react-native'
import { Button, Text, XStack, YStack } from 'tamagui'

import { BrandLogo } from '@/components/BrandLogo'
import { NavIcon } from '@/components/icons'
import { useSidebar } from '@/context/SidebarContext'
import { useThemeMode } from '@/context/ThemeContext'
import { mainNav, othersNav, type NavItem } from '@/navigation/navItems'
import { brand } from '@/theme/colors'

function pathMatches(pathname: string, href: string) {
  if (href === '/') return pathname === '/' || pathname === ''
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { width } = useWindowDimensions()
  const isLg = width >= 1024
  const { resolvedTheme } = useThemeMode()
  const {
    isExpanded,
    isHovered,
    isMobileOpen,
    sidebarWidth,
    setIsHovered,
    closeMobileSidebar,
  } = useSidebar()

  const wide = isExpanded || isHovered || isMobileOpen
  const [openKey, setOpenKey] = useState<string | null>(null)

  useEffect(() => {
    for (const item of [...mainNav, ...othersNav]) {
      if (item.subItems?.some((s) => pathMatches(pathname, s.href))) {
        setOpenKey(item.name)
        return
      }
    }
  }, [pathname])

  const activeColor = resolvedTheme === 'dark' ? brand[400] : brand[500]
  const inactiveIcon = resolvedTheme === 'dark' ? '#98a2b3' : '#667085'

  // Off-canvas on < lg when closed
  const hiddenOffCanvas = !isLg && !isMobileOpen

  const hoverHandlers =
    Platform.OS === 'web'
      ? {
          onMouseEnter: () => {
            if (!isExpanded) setIsHovered(true)
          },
          onMouseLeave: () => setIsHovered(false),
        }
      : {}

  const renderGroup = (title: string, items: NavItem[]) => (
    <YStack gap="$3" key={title}>
      <XStack items="center" justify={wide ? 'flex-start' : 'center'} px="$1">
        {wide ? (
          <Text fontSize={12} fontWeight="500" color="$gray8" textTransform="uppercase">
            {title}
          </Text>
        ) : (
          <NavIcon name="dots" color={inactiveIcon} size={20} />
        )}
      </XStack>
      <YStack gap="$1">
        {items.map((item) => {
          const hasSubs = !!item.subItems?.length
          const isOpen = openKey === item.name
          const childActive = item.subItems?.some((s) => pathMatches(pathname, s.href))
          const selfActive = item.href ? pathMatches(pathname, item.href) : false
          const active = selfActive || !!childActive

          if (!hasSubs && item.href) {
            return (
              <Link key={item.name} href={item.href as any} asChild>
                <Button
                  unstyled
                  onPress={closeMobileSidebar}
                  flexDirection="row"
                  items="center"
                  gap="$3"
                  px="$3"
                  py={10}
                  rounded={8}
                  bg={active ? '$accentBackground' : 'transparent'}
                  hoverStyle={{ bg: active ? '$accentBackground' : '$backgroundHover' }}
                  justify={wide ? 'flex-start' : 'center'}
                >
                  <NavIcon name={item.icon} color={active ? activeColor : inactiveIcon} />
                  {wide ? (
                    <Text fontSize={14} fontWeight="500" color={active ? activeColor : '$gray11'}>
                      {item.name}
                    </Text>
                  ) : null}
                </Button>
              </Link>
            )
          }

          return (
            <YStack key={item.name}>
              <Button
                unstyled
                onPress={() => setOpenKey(isOpen ? null : item.name)}
                flexDirection="row"
                items="center"
                gap="$3"
                px="$3"
                py={10}
                rounded={8}
                bg={active || isOpen ? '$accentBackground' : 'transparent'}
                hoverStyle={{ bg: '$backgroundHover' }}
                justify={wide ? 'flex-start' : 'center'}
              >
                <NavIcon
                  name={item.icon}
                  color={active || isOpen ? activeColor : inactiveIcon}
                />
                {wide ? (
                  <>
                    <Text
                      flex={1}
                      text="left"
                      fontSize={14}
                      fontWeight="500"
                      color={active || isOpen ? activeColor : '$gray11'}
                    >
                      {item.name}
                    </Text>
                    <YStack rotate={isOpen ? '180deg' : '0deg'}>
                      <NavIcon
                        name="chevron"
                        color={active || isOpen ? activeColor : inactiveIcon}
                        size={18}
                      />
                    </YStack>
                  </>
                ) : null}
              </Button>
              {wide && isOpen && item.subItems ? (
                <YStack mt="$1" ml={36} gap="$1">
                  {item.subItems.map((sub) => {
                    const subActive = pathMatches(pathname, sub.href)
                    return (
                      <Button
                        key={sub.href}
                        unstyled
                        onPress={() => {
                          closeMobileSidebar()
                          router.push(sub.href as any)
                        }}
                        px="$3"
                        py="$2"
                        rounded={8}
                        items="flex-start"
                        bg={subActive ? '$accentBackground' : 'transparent'}
                        hoverStyle={{ bg: '$backgroundHover' }}
                      >
                        <Text
                          fontSize={14}
                          fontWeight="500"
                          color={subActive ? activeColor : '$gray10'}
                        >
                          {sub.name}
                        </Text>
                      </Button>
                    )
                  })}
                </YStack>
              ) : null}
            </YStack>
          )
        })}
      </YStack>
    </YStack>
  )

  return (
    <YStack
      position="absolute"
      t={0}
      l={0}
      b={0}
      width={sidebarWidth}
      z={50}
      bg="$backgroundStrong"
      borderRightWidth={1}
      borderColor="$borderColor"
      px="$4"
      style={
        {
          transform: [{ translateX: hiddenOffCanvas ? -sidebarWidth : 0 }],
          ...(Platform.OS === 'web' ? { position: 'fixed' } : {}),
        } as any
      }
      {...(hoverHandlers as any)}
    >
      <YStack py="$6" items={wide ? 'flex-start' : 'center'}>
        <BrandLogo />
      </YStack>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <YStack gap="$5" pb="$8">
          {renderGroup('Menu', mainNav)}
          {renderGroup('Others', othersNav)}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
