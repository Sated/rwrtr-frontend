import { Container, type ContainerProps, rem, Title } from '@mantine/core'

interface ContainerWrapperProps extends ContainerProps {
  title?: string
}

export function ContainerWrapper({ children, title, ...props }: ContainerWrapperProps) {
  return <Container my={rem(64)} {...props}>
    {title && <Title ta="center" mb={rem(32)}>
      {title}
    </Title>}

    {children}
  </Container>
}