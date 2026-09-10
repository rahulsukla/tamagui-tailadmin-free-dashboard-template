import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import { Alert } from '@/components/ui/Alert'
import { ComponentCard } from '@/components/ui/ComponentCard'
import { YStack } from 'tamagui'

export default function AlertsPage() {
  return (
    <YStack gap="$5" flex={1}>
      <PageBreadcrumb pageTitle="Alerts" />

      <ComponentCard title="Success Alert">
        <Alert
          variant="success"
          title="Success Message"
          message="Be cautious when performing this action."
          showLink
          linkHref="/"
          linkText="Learn more"
        />
        <Alert
          variant="success"
          title="Success Message"
          message="Be cautious when performing this action."
        />
      </ComponentCard>

      <ComponentCard title="Warning Alert">
        <Alert
          variant="warning"
          title="Warning Message"
          message="Be cautious when performing this action."
          showLink
          linkHref="/"
          linkText="Learn more"
        />
        <Alert
          variant="warning"
          title="Warning Message"
          message="Be cautious when performing this action."
        />
      </ComponentCard>

      <ComponentCard title="Error Alert">
        <Alert
          variant="error"
          title="Error Message"
          message="Be cautious when performing this action."
          showLink
          linkHref="/"
          linkText="Learn more"
        />
        <Alert
          variant="error"
          title="Error Message"
          message="Be cautious when performing this action."
        />
      </ComponentCard>

      <ComponentCard title="Info Alert">
        <Alert
          variant="info"
          title="Info Message"
          message="Be cautious when performing this action."
          showLink
          linkHref="/"
          linkText="Learn more"
        />
        <Alert
          variant="info"
          title="Info Message"
          message="Be cautious when performing this action."
        />
      </ComponentCard>
    </YStack>
  )
}
