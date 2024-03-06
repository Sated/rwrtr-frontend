import { AspectRatio, Container, rem, Title } from '@mantine/core'

export function HowItWorks() {
  return (
    <AspectRatio ratio={1080 / 720} mx="auto">
      <img
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png"
        alt="Panda"
      />
    </AspectRatio>
  )
}
