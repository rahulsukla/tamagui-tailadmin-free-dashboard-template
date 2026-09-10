import { useState } from 'react'
import { Pressable, TextInput } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { Badge } from '@/components/ui/Badge'
import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { useThemeMode } from '@/context/ThemeContext'

/** Metric / KPI style tile */
export function MetricTile({
  label,
  value,
  delta,
  positive = true,
  hint,
}: {
  label: string
  value: string
  delta?: string
  positive?: boolean
  hint?: string
}) {
  return (
    <YStack
      flex={1}
      minW={200}
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      p={20}
      gap={10}
    >
      <Text fontSize={14} color="$gray10">
        {label}
      </Text>
      <XStack items="flex-end" gap={10} flexWrap="wrap">
        <Text fontSize={28} fontWeight="700" color="$color" letterSpacing={-0.4}>
          {value}
        </Text>
        {delta ? (
          <Text
            fontSize={13}
            fontWeight="600"
            color={positive ? '$green10' : '$red10'}
            mb={4}
          >
            {delta}
          </Text>
        ) : null}
      </XStack>
      {hint ? (
        <Text fontSize={12} color="$gray10">
          {hint}
        </Text>
      ) : null}
    </YStack>
  )
}

/** Soft accent / brand highlight tile */
export function AccentTile({
  title,
  body,
  cta,
  onPress,
}: {
  title: string
  body: string
  cta?: string
  onPress?: () => void
}) {
  const { brandColor } = useTemplateConfig()
  return (
    <YStack
      flex={1}
      minW={200}
      rounded={16}
      p={20}
      gap={12}
      bg={brandColor as any}
    >
      <Text fontSize={18} fontWeight="600" color="#fff">
        {title}
      </Text>
      <Text fontSize={14} color="rgba(255,255,255,0.88)" lineHeight={20}>
        {body}
      </Text>
      {cta ? (
        <Pressable onPress={onPress}>
          <XStack
            self="flex-start"
            mt={4}
            px={14}
            py={8}
            rounded={8}
            bg="rgba(255,255,255,0.18)"
          >
            <Text fontSize={13} fontWeight="600" color="#fff">
              {cta}
            </Text>
          </XStack>
        </Pressable>
      ) : null}
    </YStack>
  )
}

/** Status / list row tile */
export function StatusTile({
  title,
  subtitle,
  status,
}: {
  title: string
  subtitle: string
  status: 'success' | 'warning' | 'error' | 'primary'
}) {
  return (
    <YStack
      flex={1}
      minW={200}
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      p={20}
      gap={12}
    >
      <XStack justify="space-between" items="center" gap={8}>
        <Text fontSize={16} fontWeight="600" color="$color" flex={1} numberOfLines={1}>
          {title}
        </Text>
        <Badge color={status} variant="light" size="sm">
          {status === 'success'
            ? 'Healthy'
            : status === 'warning'
              ? 'Watch'
              : status === 'error'
                ? 'Critical'
                : 'Active'}
        </Badge>
      </XStack>
      <Text fontSize={14} color="$gray10">
        {subtitle}
      </Text>
    </YStack>
  )
}

/** Icon feature tile */
export function FeatureTile({
  icon,
  title,
  body,
}: {
  icon: string
  title: string
  body: string
}) {
  const { brandColor } = useTemplateConfig()
  return (
    <YStack
      flex={1}
      minW={200}
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      p={20}
      gap={12}
    >
      <YStack
        width={44}
        height={44}
        rounded={12}
        items="center"
        justify="center"
        bg="$blue3"
      >
        <Text fontSize={18} fontWeight="700" color={brandColor as any}>
          {icon}
        </Text>
      </YStack>
      <Text fontSize={16} fontWeight="600" color="$color">
        {title}
      </Text>
      <Text fontSize={14} color="$gray10" lineHeight={20}>
        {body}
      </Text>
    </YStack>
  )
}

type ChatMsg = { id: string; from: 'me' | 'them'; text: string; time: string }

const SEED: ChatMsg[] = [
  {
    id: '1',
    from: 'them',
    text: 'Hey — can you review the dashboard export?',
    time: '10:12',
  },
  {
    id: '2',
    from: 'me',
    text: 'On it. Sharing a quick preview in a minute.',
    time: '10:14',
  },
  {
    id: '3',
    from: 'them',
    text: 'Perfect, thanks!',
    time: '10:15',
  },
]

/** Chat conversation tile with composer */
export function ChatTile() {
  const { brandColor } = useTemplateConfig()
  const { resolvedTheme } = useThemeMode()
  const [messages, setMessages] = useState(SEED)
  const [draft, setDraft] = useState('')
  const inputBg = resolvedTheme === 'dark' ? '$gray3' : '$gray2'

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        from: 'me',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setDraft('')
  }

  return (
    <YStack
      width="100%"
      rounded={16}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$backgroundStrong"
      overflow="hidden"
      minH={360}
    >
      <XStack
        px={16}
        py={14}
        borderBottomWidth={1}
        borderColor="$borderColor"
        items="center"
        gap={12}
      >
        <YStack
          width={40}
          height={40}
          rounded={20}
          bg={brandColor as any}
          items="center"
          justify="center"
        >
          <Text color="#fff" fontWeight="700" fontSize={14}>
            AK
          </Text>
        </YStack>
        <YStack flex={1} minW={0}>
          <Text fontSize={15} fontWeight="600" color="$color">
            Alex Kim
          </Text>
          <Text fontSize={12} color="$gray10">
            Online · Product
          </Text>
        </YStack>
      </XStack>

      <YStack flex={1} p={16} gap={12} minH={220}>
        {messages.map((m) => {
          const mine = m.from === 'me'
          return (
            <YStack key={m.id} items={mine ? 'flex-end' : 'flex-start'} gap={4}>
              <YStack
                maxW="82%"
                px={14}
                py={10}
                rounded={16}
                bg={mine ? (brandColor as any) : inputBg}
              >
                <Text fontSize={14} color={mine ? '#fff' : '$color'} lineHeight={20}>
                  {m.text}
                </Text>
              </YStack>
              <Text fontSize={11} color="$gray10" px={4}>
                {m.time}
              </Text>
            </YStack>
          )
        })}
      </YStack>

      <XStack
        px={12}
        py={12}
        gap={8}
        borderTopWidth={1}
        borderColor="$borderColor"
        items="center"
      >
        <YStack
          flex={1}
          bg={inputBg}
          rounded={12}
          px={12}
          py={8}
          borderWidth={1}
          borderColor="$borderColor"
        >
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Write a message…"
            placeholderTextColor="#98a2b3"
            onSubmitEditing={send}
            style={{
              fontSize: 14,
              color: resolvedTheme === 'dark' ? '#f2f4f7' : '#101828',
              outlineStyle: 'none' as any,
              minHeight: 24,
            }}
          />
        </YStack>
        <Pressable onPress={send} accessibilityLabel="Send message">
          <YStack
            width={44}
            height={44}
            rounded={12}
            bg={brandColor as any}
            items="center"
            justify="center"
          >
            <Text color="#fff" fontSize={16} fontWeight="700">
              ↑
            </Text>
          </YStack>
        </Pressable>
      </XStack>
    </YStack>
  )
}
