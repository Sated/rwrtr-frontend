import cx from 'clsx';
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { rem } from '@mantine/core'
import { Container, ActionIcon, useMantineColorScheme, useComputedColorScheme, Group } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import Logo from '@/assets/images/Logo'

import s from './Header.module.scss';
import Link from 'next/link'
import Cookies from 'js-cookie'

export function Header() {
  const router = useRouter()
  const { i18n, t } = useTranslation('common');
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <header className={s.header}>
      <Container size="md" className={s.inner}>
        <Link href="/" className={s.logo} >
          <Logo style={{height: rem(36)}} />
        </Link>

        <Group justify="center">
          <ActionIcon
            variant="transparent" color="gray" size="lg" aria-label={t('header.language')}
            onClick={async (event) => {
              event.preventDefault();
              const targetLocale = i18n.language === 'en' ? 'ru' : 'en';
              await i18n.changeLanguage(targetLocale);
              Cookies.set('NEXT_LOCALE', targetLocale, { expires: 365 })
              await router.replace(router.asPath, router.asPath, { locale: targetLocale })
            }}
          >
            {i18n.language.toUpperCase()}
          </ActionIcon>

          <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
          >
            <IconSun className={cx(s.icon, s.light)} stroke={1.5} />
            <IconMoon className={cx(s.icon, s.dark)} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </header>
  );
}