import { Link, usePathname, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Platform, ScrollView, useWindowDimensions } from 'react-native'
import { Button, Text, XStack, YStack } from 'tamagui'

import { BrandLogo } from '@/components/BrandLogo'
import { NavIcon } from '@/components/icons'
import { useSidebar } from '@/context/SidebarContext'
import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { useThemeMode } from '@/context/ThemeContext'
import { mainNav, othersNav, type NavItem } from '@/navigation/navItems'

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
  const { brandColor } = useTemplateConfig()
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

  const activeColor = brandColor
  const inactiveIcon = resolvedTheme === 'dark' ? '#98a2b3' : '#667085'
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
    <YStack key={title} gap={0}>
      <XStack
        items="center"
        justify={wide ? 'flex-start' : 'center'}
        mb={16}
        px={wide ? 0 : 0}
      >
        {wide ? (
          <Text
            fontSize={12}
            fontWeight="500"
            color="$gray8"
            textTransform="uppercase"
            lineHeight={20}
          >
            {title}
          </Text>
        ) : (
          <NavIcon name="dots" color={inactiveIcon} size={20} />
        )}
      </XStack>
      {/* Nav list: gap between items; menu-item padding */}
      <YStack gap={16}>
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
                  gap={12}
                  px={12}
                  py={8}
                  rounded={8}
                  width="100%"
                  bg={active ? '$accentBackground' : 'transparent'}
                  hoverStyle={{ bg: active ? '$accentBackground' : '$backgroundHover' }}
                  justify={wide ? 'flex-start' : 'center'}
                >
                  <NavIcon name={item.icon} color={active ? activeColor : inactiveIcon} />
                  {wide ? (
                    <Text
                      fontSize={14}
                      fontWeight="500"
                      color={(active ? activeColor : '$gray11') as any}
                    >
                      {item.name}
                    </Text>
                  ) : null}
                </Button>
              </Link>
            )
          }

          return (
            <YStack key={item.name} width="100%">
              <Button
                unstyled
                onPress={() => setOpenKey(isOpen ? null : item.name)}
                flexDirection="row"
                items="center"
                gap={12}
                px={12}
                py={8}
                rounded={8}
                width="100%"
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
                      color={(active || isOpen ? activeColor : '$gray11') as any}
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
                <YStack mt={8} ml={36} gap={4}>
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
                        px={12}
                        py={10}
                        rounded={8}
                        width="100%"
                        items="flex-start"
                        bg={subActive ? '$accentBackground' : 'transparent'}
                        hoverStyle={{ bg: '$backgroundHover' }}
                      >
                        <Text
                          fontSize={14}
                          fontWeight="500"
                          color={(subActive ? activeColor : '$gray10') as any}
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
      px={20}
      style={
        {
          transform: [{ translateX: hiddenOffCanvas ? -sidebarWidth : 0 }],
          ...(Platform.OS === 'web'
            ? { position: 'fixed', transition: 'width 0.3s ease' }
            : {}),
        } as any
      }
      {...(hoverHandlers as any)}
    >
      <YStack py={32} items={wide ? 'flex-start' : 'center'}>
        <BrandLogo />
      </YStack>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <YStack gap={24} pb={24}>
          {renderGroup('Menu', mainNav)}
          {renderGroup('Others', othersNav)}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
