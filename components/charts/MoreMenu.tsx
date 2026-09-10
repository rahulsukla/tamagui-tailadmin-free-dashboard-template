import { useState } from 'react'
import { Pressable } from 'react-native'
import { Text, YStack } from 'tamagui'

export function MoreMenu() {
  const [open, setOpen] = useState(false)

  return (
    <YStack position="relative" z={10}>
      <Pressable onPress={() => setOpen((v) => !v)}>
        <Text color="$gray8" fontSize={22} lineHeight={22}>
          ⋯
        </Text>
      </Pressable>
      {open ? (
        <YStack
          position="absolute"
          t={28}
          r={0}
          width={140}
          rounded={8}
          borderWidth={1}
          borderColor="$borderColor"
          bg="$backgroundStrong"
          p="$2"
          gap={2}
        >
          {['View More', 'Delete'].map((item) => (
            <Pressable key={item} onPress={() => setOpen(false)}>
              <YStack px="$3" py="$2" rounded={6} hoverStyle={{ bg: '$backgroundHover' }}>
                <Text fontSize={14} color="$gray10">
                  {item}
                </Text>
              </YStack>
            </Pressable>
          ))}
        </YStack>
      ) : null}
    </YStack>
  )
}
