import { Modal, Pressable, useWindowDimensions } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { PortalProviders } from '@/components/PortalProviders'
import { useConfigPanel } from '@/context/ConfigPanelContext'
import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { useThemeMode, type ColorMode } from '@/context/ThemeContext'
import { brandPresets, type BrandPreset } from '@/theme/colors'

const WIDTH_OPTIONS = [
  { label: '1280', value: 1280 },
  { label: '1536', value: 1536 },
  { label: 'Full', value: 9999 },
] as const

function SectionTitle({ children }: { children: string }) {
  return (
    <Text fontSize={12} fontWeight="600" color="$gray10" letterSpacing={0.6} textTransform="uppercase">
      {children}
    </Text>
  )
}

function ChoiceChip({
  label,
  active,
  onPress,
  color,
}: {
  label: string
  active: boolean
  onPress: () => void
  color?: string
}) {
  return (
    <Pressable onPress={onPress}>
      <XStack
        px={12}
        py={8}
        rounded={8}
        borderWidth={1}
        borderColor={active ? ((color ?? '$blue10') as any) : '$borderColor'}
        bg={active ? '$blue3' : '$background'}
        items="center"
        gap="$2"
      >
        {color ? (
          <YStack width={14} height={14} rounded={999} bg={color as any} />
        ) : null}
        <Text fontSize={13} fontWeight="500" color={active ? '$color' : '$gray11'}>
          {label}
        </Text>
      </XStack>
    </Pressable>
  )
}

export function ConfigPanel() {
  const { isOpen, close } = useConfigPanel()
  const { width } = useWindowDimensions()
  const panelW = Math.min(360, width)
  const {
    config,
    brandColor,
    setBrandPreset,
    setDensity,
    setStickyHeader,
    updateConfig,
    resetConfig,
  } = useTemplateConfig()
  const { colorMode, setColorMode } = useThemeMode()

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={close}>
      <PortalProviders>
        <Pressable
          onPress={close}
          style={{
            flex: 1,
            backgroundColor: 'rgba(16,24,40,0.4)',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Pressable onPress={() => {}} style={{ width: panelW, height: '100%' }}>
            <YStack
              flex={1}
              bg="$backgroundStrong"
              borderLeftWidth={1}
              borderColor="$borderColor"
              p="$5"
              gap="$5"
            >
              <XStack items="center" justify="space-between">
                <YStack gap={4}>
                  <Text fontSize={18} fontWeight="600" color="$color">
                    Template settings
                  </Text>
                  <Text fontSize={13} color="$gray10">
                    Preview brand, density, and layout options
                  </Text>
                </YStack>
                <Pressable onPress={close}>
                  <XStack
                    width={36}
                    height={36}
                    rounded={8}
                    borderWidth={1}
                    borderColor="$borderColor"
                    items="center"
                    justify="center"
                  >
                    <Text fontSize={16} color="$gray11">
                      ✕
                    </Text>
                  </XStack>
                </Pressable>
              </XStack>

              <YStack gap="$3">
                <SectionTitle>Theme mode</SectionTitle>
                <XStack gap="$2" flexWrap="wrap">
                  {(['light', 'dark', 'system'] as ColorMode[]).map((mode) => (
                    <ChoiceChip
                      key={mode}
                      label={mode}
                      active={colorMode === mode}
                      onPress={() => setColorMode(mode)}
                    />
                  ))}
                </XStack>
              </YStack>

              <YStack gap="$3">
                <SectionTitle>Brand preset</SectionTitle>
                <XStack gap="$2" flexWrap="wrap">
                  {(Object.keys(brandPresets) as BrandPreset[]).map((preset) => (
                    <ChoiceChip
                      key={preset}
                      label={preset}
                      color={brandPresets[preset]}
                      active={config.brandPreset === preset}
                      onPress={() => setBrandPreset(preset)}
                    />
                  ))}
                </XStack>
                <XStack
                  height={8}
                  rounded={999}
                  bg={brandColor as any}
                  width="100%"
                />
              </YStack>

              <YStack gap="$3">
                <SectionTitle>Density</SectionTitle>
                <XStack gap="$2" flexWrap="wrap">
                  <ChoiceChip
                    label="Comfortable"
                    active={config.density === 'comfortable'}
                    onPress={() => setDensity('comfortable')}
                  />
                  <ChoiceChip
                    label="Compact"
                    active={config.density === 'compact'}
                    onPress={() => setDensity('compact')}
                  />
                </XStack>
              </YStack>

              <YStack gap="$3">
                <SectionTitle>Sticky header</SectionTitle>
                <XStack gap="$2" flexWrap="wrap">
                  <ChoiceChip
                    label="On"
                    active={config.stickyHeader}
                    onPress={() => setStickyHeader(true)}
                  />
                  <ChoiceChip
                    label="Off"
                    active={!config.stickyHeader}
                    onPress={() => setStickyHeader(false)}
                  />
                </XStack>
              </YStack>

              <YStack gap="$3">
                <SectionTitle>Content max width</SectionTitle>
                <XStack gap="$2" flexWrap="wrap">
                  {WIDTH_OPTIONS.map((opt) => (
                    <ChoiceChip
                      key={opt.label}
                      label={opt.label}
                      active={config.contentMaxWidth === opt.value}
                      onPress={() => updateConfig({ contentMaxWidth: opt.value })}
                    />
                  ))}
                </XStack>
              </YStack>

              <Pressable onPress={resetConfig}>
                <XStack
                  mt="$2"
                  height={44}
                  rounded={8}
                  borderWidth={1}
                  borderColor="$borderColor"
                  items="center"
                  justify="center"
                  hoverStyle={{ bg: '$backgroundHover' }}
                >
                  <Text fontSize={14} fontWeight="500" color="$gray11">
                    Reset to defaults
                  </Text>
                </XStack>
              </Pressable>
            </YStack>
          </Pressable>
        </Pressable>
      </PortalProviders>
    </Modal>
  )
}
