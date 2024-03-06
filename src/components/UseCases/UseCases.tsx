import { Container, ThemeIcon, Title, SimpleGrid, Text } from '@mantine/core'
import s from './UseCases.module.scss'
import { Trans, useTranslation } from 'next-i18next'
import { IconBrandBlogger, IconSchool, IconTarget, IconTextGrammar } from '@tabler/icons-react'

const icons = {
  'brand-blogger': <IconBrandBlogger size={24} />,
  school: <IconSchool size={24} />,
  target: <IconTarget size={24} />,
  'text-grammar': <IconTextGrammar size={24} />,
}

export function UseCases() {
  const { t } = useTranslation('common')
  const cases: Array<{ title: string; text: string; icon: keyof typeof icons }> = t('useCases.items', {
    returnObjects: true,
  })

  const items = cases.map((item) => (
    <div className={s.item} key={item.title}>
      <ThemeIcon variant="light" className={s.itemIcon} size={60} radius="md" children={icons[item.icon]} />

      <div>
        <Text fw={700} fz="lg" className={s.itemTitle}>
          {item.title}
        </Text>
        <Text c="dimmed">{item.text}</Text>
      </div>
    </div>
  ))

  return (
    <>
      <Text className={s.supTitle}>{t('useCases.title')}</Text>

      <Title className={s.title} order={2}>
        <Trans>
          {t('useCases.subtitle')}
          <span className={s.highlight}></span>
        </Trans>
      </Title>

      <Container size={660} p={0}>
        <Text c="dimmed" className={s.description}>
          {t('useCases.description')}
        </Text>
      </Container>

      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={50} mt={30}>
        {items}
      </SimpleGrid>
    </>
  )
}
