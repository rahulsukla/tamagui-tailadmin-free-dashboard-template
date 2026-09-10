import { useRouter } from 'expo-router'
import { Platform, Pressable, useWindowDimensions, View } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { useTemplateConfig } from '@/context/TemplateConfigContext'

export default function LandingPage() {
  const router = useRouter()
  const { brandColor } = useTemplateConfig()
  const { width } = useWindowDimensions()
  const wide = width >= 960

  // Web CSS gradient — cast past RN ViewStyle (no backgroundImage)
  const heroStyle = [
    {
      minHeight: wide ? 420 : 360,
      paddingHorizontal: wide ? 48 : 24,
      paddingVertical: wide ? 48 : 32,
      justifyContent: 'flex-end' as const,
      backgroundColor: '#1d3c32',
    },
    Platform.OS === 'web'
      ? ({
          backgroundImage: `linear-gradient(145deg, ${brandColor}33 0%, transparent 42%), linear-gradient(165deg, #14352c 0%, #1d3c32 48%, #2f7058 100%)`,
        } as object)
      : null,
  ]

  return (
    <YStack gap={20} flex={1}>
      <PageBreadcrumb pageTitle="Landing" />

      <YStack
        rounded={20}
        overflow="hidden"
        borderWidth={1}
        borderColor="$borderColor"
        bg="$backgroundStrong"
      >
        <View style={heroStyle as any}>
          <YStack gap={16}>
            <Text
              fontSize={28}
              fontWeight="700"
              color="#fff"
              letterSpacing={-0.6}
            >
              Verdant
            </Text>
            <Text
              fontSize={wide ? 40 : 28}
              fontWeight="600"
              color="#fff"
              letterSpacing={-0.6}
              maxW={560}
              lineHeight={wide ? 46 : 34}
            >
              Admin surfaces that feel calm on every screen.
            </Text>
            <Text fontSize={16} color="rgba(255,255,255,0.82)" maxW={480} lineHeight={24}>
              A universal Expo + Tamagui template for dashboards, forms, and ops tools — web and
              native from one codebase.
            </Text>
            <XStack gap={12} flexWrap="wrap" mt={8}>
              <Pressable onPress={() => router.push('/')}>
                <XStack px={20} py={12} rounded={10} bg="#fff" items="center">
                  <Text fontSize={14} fontWeight="600" color="#1d3c32">
                    Open dashboard
                  </Text>
                </XStack>
              </Pressable>
              <Pressable onPress={() => router.push('/cards')}>
                <XStack
                  px={20}
                  py={12}
                  rounded={10}
                  borderWidth={1}
                  borderColor="rgba(255,255,255,0.35)"
                  items="center"
                >
                  <Text fontSize={14} fontWeight="600" color="#fff">
                    Browse cards
                  </Text>
                </XStack>
              </Pressable>
            </XStack>
          </YStack>
        </View>

        <XStack
          flexDirection={wide ? 'row' : 'column'}
          gap={0}
          borderTopWidth={1}
          borderColor="$borderColor"
        >
          {[
            {
              title: 'Universal shell',
              body: 'Sidebar, header, and theme panel shared across platforms.',
            },
            {
              title: 'Composable tiles',
              body: 'KPI, accent, status, feature, and chat tiles ready to reuse.',
            },
            {
              title: 'Lean charts',
              body: 'SVG bar, area, and pie charts without a heavy chart SDK.',
            },
          ].map((item, i) => (
            <YStack
              key={item.title}
              flex={1}
              p={24}
              gap={8}
              borderLeftWidth={wide && i > 0 ? 1 : 0}
              borderTopWidth={!wide && i > 0 ? 1 : 0}
              borderColor="$borderColor"
            >
              <Text fontSize={16} fontWeight="600" color="$color">
                {item.title}
              </Text>
              <Text fontSize={14} color="$gray10" lineHeight={20}>
                {item.body}
              </Text>
            </YStack>
          ))}
        </XStack>
      </YStack>
    </YStack>
  )
}
