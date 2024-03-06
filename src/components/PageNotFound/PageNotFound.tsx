import { Container, Title, Text, Button, Group } from '@mantine/core'

import { PageNotFoundImage } from './PageNotFoundImage';
import s from './PageNotFound.module.scss';
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export function PageNotFound() {
  const { t } = useTranslation("common");

  return (
    <Container className={s.root}>
      <div className={s.inner}>
        <PageNotFoundImage className={s.image} />
        <div className={s.content}>
          <Title className={s.title}>{t('notFound.title')}</Title>
          <Text c="dimmed" size="lg" ta="center" className={s.description}>
            {t('notFound.description')}
          </Text>
          <Group justify="center">
            <Link href="/">
              <Button size="md">{t('notFound.backButton')}</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  );
}