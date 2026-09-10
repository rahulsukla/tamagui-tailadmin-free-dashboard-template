import { Text, XStack } from 'tamagui'

export function PageBreadcrumb({
  pageTitle,
  items,
}: {
  pageTitle: string
  items?: { label: string }[]
}) {
  return (
    <XStack items="center" justify="space-between" flexWrap="wrap" gap="$3" mb="$5">
      <Text fontSize={24} fontWeight="600" color="$color" letterSpacing={-0.3}>
        {pageTitle}
      </Text>
      <XStack items="center" gap="$2">
        <Text fontSize={14} color="$gray10">
          Home
        </Text>
        {(items ?? [{ label: pageTitle }]).map((item) => (
          <XStack key={item.label} items="center" gap="$2">
            <Text fontSize={14} color="$gray8">
              /
            </Text>
            <Text fontSize={14} color="$gray10">
              {item.label}
            </Text>
          </XStack>
        ))}
      </XStack>
    </XStack>
  )
}
