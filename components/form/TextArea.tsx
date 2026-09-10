import { Text, TextArea as TTextArea, YStack } from 'tamagui'

import { brand, error as errorPalette } from '@/theme/colors'

type AppTextAreaProps = {
  value?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  hint?: string
  numberOfLines?: number
}

export function AppTextArea({
  value,
  onChangeText,
  placeholder = 'Enter your message',
  disabled,
  error,
  hint,
  numberOfLines = 4,
}: AppTextAreaProps) {
  return (
    <YStack gap={8} width="100%">
      <TTextArea
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        disabled={disabled}
        numberOfLines={numberOfLines}
        width="100%"
        rounded={8}
        borderWidth={1}
        borderColor={(error ? errorPalette[500] : '$borderColor') as any}
        bg={disabled ? '$gray3' : '$background'}
        color="$color"
        placeholderTextColor="$placeholderColor"
        px={16}
        py={10}
        fontSize={14}
        opacity={disabled ? 0.55 : 1}
        focusStyle={{
          borderColor: (error ? errorPalette[500] : brand[300]) as any,
          outlineWidth: 0,
        }}
      />
      {hint ? (
        <Text
          fontSize={14}
          color={(error ? errorPalette[500] : undefined) as any}
          {...(!error ? { color: '$gray10' } : {})}
        >
          {hint}
        </Text>
      ) : null}
    </YStack>
  )
}
