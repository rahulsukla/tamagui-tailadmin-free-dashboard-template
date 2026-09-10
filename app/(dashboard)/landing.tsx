import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Platform, Pressable, useWindowDimensions, View } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { useThemeMode } from '@/context/ThemeContext'
import { gray } from '@/theme/colors'

const FEATURES = [
  {
    title: 'Universal shell',
    body: 'Sidebar, sticky header, and theme panel shared across web, iOS, and Android.',
    mark: '01',
  },
  {
    title: 'Composable tiles',
    body: 'KPI, accent, status, feature, and chat tiles you can drop into any surface.',
    mark: '02',
  },
  {
    title: 'Lean charts',
    body: 'SVG bar, area, and pie charts without pulling a heavy charting SDK.',
    mark: '03',
  },
  {
    title: 'Forms & tables',
    body: 'Inputs, selects, documents, and responsive data tables that fill the card.',
    mark: '04',
  },
  {
    title: 'Theme presets',
    body: 'Verdant green by default, with live brand and density controls in the panel.',
    mark: '05',
  },
  {
    title: 'Auth & pages',
    body: 'Sign-in, sign-up, blank, 404, profile, calendar — ready demo routes included.',
    mark: '06',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'Scaffold',
    body: 'create-expo-app with the Verdant template and start the universal app.',
  },
  {
    n: '2',
    title: 'Compose',
    body: 'Wire dashboard widgets, forms, and nav items to your product data.',
  },
  {
    n: '3',
    title: 'Ship',
    body: 'Ship web and native from one Expo Router + Tamagui codebase.',
  },
]

const SHOWCASE = [
  { title: 'Ecommerce KPIs', href: '/', note: 'Revenue, customers, growth' },
  { title: 'Calendar', href: '/calendar', note: 'Month grid + events' },
  { title: 'Profile', href: '/profile', note: 'Cards + edit modals' },
  { title: 'Tables', href: '/basic-tables', note: 'Responsive data rows' },
  { title: 'Cards gallery', href: '/cards', note: 'Tiles including chat' },
  { title: 'Charts', href: '/line-chart', note: 'Area & bar demos' },
  { title: 'Documents', href: '/documents', note: 'Checklist table' },
  { title: 'Progress', href: '/progress', note: 'Linear progress bars' },
]

const FAQS = [
  {
    q: 'Is Verdant free to use?',
    a: 'Yes. MIT licensed. Upstream free-admin and tweakcn Light Green inspiration is credited in NOTICE.',
  },
  {
    q: 'Does it run on native?',
    a: 'Yes. Expo SDK 57 + Expo Router target iOS, Android, and web from one tree.',
  },
  {
    q: 'Can I change the brand color?',
    a: 'Open the template settings gear in the header to switch presets, density, and layout width.',
  },
  {
    q: 'Where do I start after install?',
    a: 'Open the Ecommerce dashboard, then explore Pages → Landing and UI Elements → Cards.',
  },
]

function CtaButton({
  label,
  onPress,
  primary,
  brandColor,
  dark,
}: {
  label: string
  onPress: () => void
  primary?: boolean
  brandColor: string
  dark: boolean
}) {
  return (
    <Pressable onPress={onPress}>
      <XStack
        px={20}
        py={14}
        rounded={12}
        items="center"
        justify="center"
        bg={primary ? (brandColor as any) : 'transparent'}
        borderWidth={primary ? 0 : 1}
        borderColor={dark ? gray[700] : gray[300]}
      >
        <Text
          fontSize={15}
          fontWeight="600"
          color={primary ? '#fff' : dark ? gray[100] : gray[800]}
        >
          {label}
        </Text>
      </XStack>
    </Pressable>
  )
}

function FaqItem({
  q,
  a,
  open,
  onToggle,
  dark,
}: {
  q: string
  a: string
  open: boolean
  onToggle: () => void
  dark: boolean
}) {
  return (
    <YStack
      borderWidth={1}
      borderColor="$borderColor"
      rounded={14}
      bg="$backgroundStrong"
      overflow="hidden"
    >
      <Pressable onPress={onToggle}>
        <XStack px={20} py={16} items="center" justify="space-between" gap={12}>
          <Text flex={1} minW={0} fontSize={16} fontWeight="600" color="$color">
            {q}
          </Text>
          <Text fontSize={18} color="$gray10">
            {open ? '−' : '+'}
          </Text>
        </XStack>
      </Pressable>
      {open ? (
        <YStack
          px={20}
          pb={18}
          borderTopWidth={1}
          borderColor="$borderColor"
          bg={dark ? gray[950] : gray[50]}
        >
          <Text mt={14} fontSize={14} color="$gray10" lineHeight={22}>
            {a}
          </Text>
        </YStack>
      ) : null}
    </YStack>
  )
}

export default function LandingPage() {
  const router = useRouter()
  const { brandColor } = useTemplateConfig()
  const { resolvedTheme } = useThemeMode()
  const dark = resolvedTheme === 'dark'
  const { width } = useWindowDimensions()
  const wide = width >= 960
  const mid = width >= 720
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const heroStyle = [
    {
      minHeight: wide ? 460 : 400,
      paddingHorizontal: wide ? 40 : 22,
      paddingVertical: wide ? 44 : 28,
      justifyContent: 'center' as const,
      backgroundColor: dark ? '#0f211c' : '#1d3c32',
    },
    Platform.OS === 'web'
      ? ({
          backgroundImage: `linear-gradient(145deg, ${brandColor}40 0%, transparent 45%), linear-gradient(165deg, #0f211c 0%, #1d3c32 50%, #2f7058 100%)`,
        } as object)
      : null,
  ]

  return (
    <YStack gap={28} flex={1} width="100%" pb={24}>
      <PageBreadcrumb pageTitle="Landing" />

      {/* Hero */}
      <YStack
        rounded={24}
        overflow="hidden"
        borderWidth={1}
        borderColor="$borderColor"
        bg="$backgroundStrong"
      >
        <View style={heroStyle as any}>
          <XStack
            flexDirection={wide ? 'row' : 'column'}
            gap={wide ? 40 : 28}
            items={wide ? 'center' : 'stretch'}
            width="100%"
          >
            <YStack flex={1} minW={0} gap={16} maxW={wide ? 520 : undefined}>
              <Text fontSize={15} fontWeight="600" color="rgba(255,255,255,0.75)" letterSpacing={0.4}>
                VERDANT
              </Text>
              <Text
                fontSize={wide ? 44 : 30}
                fontWeight="700"
                color="#fff"
                letterSpacing={-0.8}
                lineHeight={wide ? 50 : 36}
              >
                Admin surfaces that feel calm on every screen.
              </Text>
              <Text fontSize={16} color="rgba(255,255,255,0.82)" lineHeight={24} maxW={480}>
                A universal Expo + Tamagui template for dashboards, forms, and ops tools — one
                codebase for web and native.
              </Text>
              <XStack gap={12} flexWrap="wrap" mt={8}>
                <Pressable onPress={() => router.push('/')}>
                  <XStack px={20} py={14} rounded={12} bg="#fff" items="center" justify="center">
                    <Text fontSize={15} fontWeight="600" color="#1d3c32">
                      Open dashboard
                    </Text>
                  </XStack>
                </Pressable>
                <Pressable onPress={() => router.push('/cards')}>
                  <XStack
                    px={20}
                    py={14}
                    rounded={12}
                    borderWidth={1}
                    borderColor="rgba(255,255,255,0.35)"
                    items="center"
                  >
                    <Text fontSize={15} fontWeight="600" color="#fff">
                      Browse cards
                    </Text>
                  </XStack>
                </Pressable>
              </XStack>
            </YStack>

            {/* Visual showcase panel */}
            <YStack
              flex={wide ? 1 : undefined}
              minW={0}
              width={wide ? undefined : '100%'}
              gap={12}
            >
              <YStack
                rounded={18}
                bg="rgba(255,255,255,0.1)"
                borderWidth={1}
                borderColor="rgba(255,255,255,0.18)"
                p={18}
                gap={14}
              >
                <XStack justify="space-between" items="center" gap={8}>
                  <Text fontSize={13} fontWeight="600" color="rgba(255,255,255,0.7)">
                    Live preview
                  </Text>
                  <XStack
                    px={10}
                    py={4}
                    rounded={999}
                    bg="rgba(255,255,255,0.15)"
                  >
                    <Text fontSize={11} fontWeight="600" color="#fff">
                      Expo 57
                    </Text>
                  </XStack>
                </XStack>
                <XStack gap={10} flexWrap="wrap">
                  {[
                    { label: 'Revenue', value: '$1.25k' },
                    { label: 'Orders', value: '5,359' },
                    { label: 'Target', value: '75%' },
                  ].map((m) => (
                    <YStack
                      key={m.label}
                      flex={1}
                      minW={90}
                      rounded={12}
                      bg="rgba(255,255,255,0.12)"
                      p={12}
                      gap={4}
                    >
                      <Text fontSize={11} color="rgba(255,255,255,0.65)" numberOfLines={1}>
                        {m.label}
                      </Text>
                      <Text fontSize={20} fontWeight="700" color="#fff" numberOfLines={1}>
                        {m.value}
                      </Text>
                    </YStack>
                  ))}
                </XStack>
                <YStack
                  height={72}
                  rounded={12}
                  bg="rgba(255,255,255,0.08)"
                  overflow="hidden"
                  justify="flex-end"
                  px={10}
                  pb={10}
                >
                  <XStack items="flex-end" gap={6} height={52}>
                    {[40, 70, 55, 85, 48, 92, 64].map((h, i) => (
                      <YStack
                        key={i}
                        flex={1}
                        rounded={4}
                        bg={(i % 2 === 0 ? brandColor : 'rgba(255,255,255,0.35)') as any}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </XStack>
                </YStack>
              </YStack>
            </YStack>
          </XStack>
        </View>
      </YStack>

      {/* Feature grid */}
      <YStack gap={16} width="100%">
        <YStack gap={6} maxW={560}>
          <Text fontSize={28} fontWeight="700" color="$color" letterSpacing={-0.5}>
            Everything the template ships
          </Text>
          <Text fontSize={15} color="$gray10" lineHeight={22}>
            Production-shaped building blocks for an admin product — not a toy kit of orphaned demos.
          </Text>
        </YStack>
        <XStack flexWrap="wrap" gap={16} width="100%">
          {FEATURES.map((f) => (
            <YStack
              key={f.title}
              flex={1}
              minW={mid ? 220 : '100%'}
              rounded={16}
              borderWidth={1}
              borderColor="$borderColor"
              bg="$backgroundStrong"
              p={22}
              gap={12}
              overflow="hidden"
            >
              <Text fontSize={13} fontWeight="700" color={brandColor as any}>
                {f.mark}
              </Text>
              <Text fontSize={17} fontWeight="600" color="$color" numberOfLines={2}>
                {f.title}
              </Text>
              <Text fontSize={14} color="$gray10" lineHeight={21}>
                {f.body}
              </Text>
            </YStack>
          ))}
        </XStack>
      </YStack>

      {/* How it works */}
      <YStack
        gap={20}
        width="100%"
        rounded={20}
        borderWidth={1}
        borderColor="$borderColor"
        bg="$backgroundStrong"
        p={wide ? 32 : 22}
      >
        <YStack gap={6} maxW={520}>
          <Text fontSize={28} fontWeight="700" color="$color" letterSpacing={-0.5}>
            How it works
          </Text>
          <Text fontSize={15} color="$gray10" lineHeight={22}>
            Three steps from empty folder to a branded admin shell.
          </Text>
        </YStack>
        <XStack flexDirection={mid ? 'row' : 'column'} gap={16} width="100%">
          {STEPS.map((s, i) => (
            <YStack key={s.n} flex={1} minW={0} gap={12}>
              <XStack items="center" gap={12}>
                <YStack
                  width={40}
                  height={40}
                  rounded={999}
                  bg={brandColor as any}
                  items="center"
                  justify="center"
                >
                  <Text fontSize={16} fontWeight="700" color="#fff">
                    {s.n}
                  </Text>
                </YStack>
                {mid && i < STEPS.length - 1 ? (
                  <YStack flex={1} height={2} bg="$borderColor" />
                ) : null}
              </XStack>
              <Text fontSize={17} fontWeight="600" color="$color">
                {s.title}
              </Text>
              <Text fontSize={14} color="$gray10" lineHeight={21}>
                {s.body}
              </Text>
            </YStack>
          ))}
        </XStack>
      </YStack>

      {/* Product showcase */}
      <YStack gap={16} width="100%">
        <YStack gap={6} maxW={560}>
          <Text fontSize={28} fontWeight="700" color="$color" letterSpacing={-0.5}>
            Surfaces you can open now
          </Text>
          <Text fontSize={15} color="$gray10" lineHeight={22}>
            Jump into real routes — each one is wired in the sidebar and smoke-tested.
          </Text>
        </YStack>
        <XStack flexWrap="wrap" gap={14} width="100%">
          {SHOWCASE.map((item) => (
            <Pressable
              key={item.href + item.title}
              onPress={() => router.push(item.href as any)}
              style={{ flexGrow: 1, flexBasis: mid ? (wide ? '22%' : '45%') : '100%', minWidth: mid ? 160 : undefined }}
            >
              <YStack
                rounded={16}
                borderWidth={1}
                borderColor="$borderColor"
                bg="$backgroundStrong"
                p={18}
                gap={8}
                minH={110}
                hoverStyle={{ bg: '$backgroundHover' }}
              >
                <Text fontSize={15} fontWeight="600" color="$color" numberOfLines={1}>
                  {item.title}
                </Text>
                <Text fontSize={13} color="$gray10" numberOfLines={2}>
                  {item.note}
                </Text>
                <Text fontSize={13} fontWeight="600" color={brandColor as any} mt={4}>
                  Open →
                </Text>
              </YStack>
            </Pressable>
          ))}
        </XStack>
      </YStack>

      {/* Trust */}
      <XStack
        flexDirection={wide ? 'row' : 'column'}
        gap={24}
        width="100%"
        rounded={20}
        borderWidth={1}
        borderColor="$borderColor"
        bg="$backgroundStrong"
        p={wide ? 32 : 22}
        items="stretch"
      >
        <YStack flex={1} minW={0} gap={12} justify="center">
          <Text fontSize={28} fontWeight="700" color="$color" letterSpacing={-0.5}>
            Built for teams that ship
          </Text>
          <Text fontSize={15} color="$gray10" lineHeight={22}>
            Keep the shell, swap the data. Theme tokens, portal-safe modals, and page audits keep
            demos from rotting as you customize.
          </Text>
        </YStack>
        <YStack
          flex={1}
          minW={0}
          gap={12}
          rounded={16}
          borderWidth={1}
          borderColor="$borderColor"
          bg={dark ? gray[950] : gray[50]}
          p={20}
        >
          {[
            'Expo Router file-based routes',
            'Tamagui light / dark themes',
            'npm run audit:pages in CI',
            'smoke:template pack → scaffold',
          ].map((line) => (
            <XStack key={line} gap={10} items="flex-start">
              <Text fontSize={14} fontWeight="700" color={brandColor as any}>
                ✓
              </Text>
              <Text flex={1} minW={0} fontSize={14} color="$color" lineHeight={20}>
                {line}
              </Text>
            </XStack>
          ))}
        </YStack>
      </XStack>

      {/* FAQ */}
      <YStack gap={14} width="100%">
        <Text fontSize={28} fontWeight="700" color="$color" letterSpacing={-0.5}>
          Questions
        </Text>
        <YStack gap={10} width="100%">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              q={item.q}
              a={item.a}
              dark={dark}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </YStack>
      </YStack>

      {/* Final CTA */}
      <YStack
        rounded={24}
        overflow="hidden"
        borderWidth={1}
        borderColor="$borderColor"
        p={wide ? 40 : 24}
        gap={18}
        items="center"
        style={
          Platform.OS === 'web'
            ? ({
                backgroundImage: `linear-gradient(135deg, ${brandColor}22 0%, transparent 50%)`,
                backgroundColor: dark ? gray[900] : '#fff',
              } as any)
            : { backgroundColor: dark ? gray[900] : '#fff' }
        }
      >
        <Text
          fontSize={wide ? 32 : 24}
          fontWeight="700"
          color="$color"
          text="center"
          letterSpacing={-0.5}
          maxW={520}
        >
          Ready to build your next admin?
        </Text>
        <Text fontSize={15} color="$gray10" text="center" maxW={420} lineHeight={22}>
          Open the dashboard, tweak the brand panel, and replace demo data with yours.
        </Text>
        <XStack gap={12} flexWrap="wrap" justify="center">
          <CtaButton
            label="Go to Ecommerce"
            primary
            brandColor={brandColor}
            dark={dark}
            onPress={() => router.push('/')}
          />
          <CtaButton
            label="Sign in demo"
            brandColor={brandColor}
            dark={dark}
            onPress={() => router.push('/signin')}
          />
        </XStack>
      </YStack>
    </YStack>
  )
}
