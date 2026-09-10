import { Input as TInput, Text, YStack } from 'tamagui'

import {
  error as errorPalette,
  success as successPalette,
} from '@/theme/colors'
import { useTemplateConfig } from '@/context/TemplateConfigContext'

type AppInputProps = {
  value?: string
  defaultValue?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  disabled?: boolean
  error?: boolean
  success?: boolean
  hint?: string
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  paddingLeft?: number
  paddingRight?: number
}

export function AppInput({
  value,
  defaultValue,
  onChangeText,
  placeholder,
  secureTextEntry,
  disabled,
  error,
  success,
  hint,
  keyboardType = 'default',
  paddingLeft,
  paddingRight,
}: AppInputProps) {
  const { brandColor } = useTemplateConfig()
  const border = error
    ? errorPalette[500]
    : success
      ? successPalette[500]
      : undefined

  return (
    <YStack gap={6} width="100%">
      <TInput
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        disabled={disabled}
        keyboardType={keyboardType}
        height={44}
        width="100%"
        rounded={8}
        borderWidth={1}
        borderColor={(border ?? '$borderColor') as any}
        bg={disabled ? '$gray3' : '$background'}
        color="$color"
        placeholderTextColor="$placeholderColor"
        px={16}
        fontSize={14}
        opacity={disabled ? 0.55 : 1}
        focusStyle={{
          borderColor: (error
            ? errorPalette[500]
            : success
              ? successPalette[500]
              : brandColor) as any,
          outlineWidth: 0,
        }}
        {...(paddingLeft != null ? { pl: paddingLeft } : null)}
        {...(paddingRight != null ? { pr: paddingRight } : null)}
      />
      {hint ? (
        <Text
          fontSize={12}
          color={
            (error
              ? errorPalette[500]
              : success
                ? successPalette[500]
                : undefined) as any
          }
          {...(!error && !success ? { color: '$gray10' } : {})}
        >
          {hint}
        </Text>
      ) : null}
    </YStack>
  )
}
