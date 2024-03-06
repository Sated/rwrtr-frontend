import { Title, Text } from '@mantine/core'

export function Hero() {
  return (
    <Title>
      A{' '}
      <Text
        component="span"
        inherit
        variant="gradient"
        gradient={{ from: 'pink', to: 'yellow' }}
      >
        rwrtr
      </Text>{' '}
      помогу перевести и переписать статьи
    </Title>
  )
}