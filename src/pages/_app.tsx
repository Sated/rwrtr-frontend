import { type Session } from 'next-auth'
import { appWithTranslation } from 'next-i18next'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { createTheme, MantineColorsTuple, MantineProvider } from '@mantine/core'
import nextI18nextConfig from '../../next-i18next.config.mjs'

import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/tiptap/styles.css'

import '@/styles/globals.css'

import { api } from '@/utils/api'
import LayoutDefault from '@/components/_layouts/LayoutDefault/LayoutDefault'
import { Notifications } from '@/components/_global/Notifications/Notifications'

const myColor: MantineColorsTuple = [
  "#f1f3f9",
  "#e0e4ec",
  "#bec7d9",
  "#99a7c7",
  "#7a8db7",
  "#667cae",
  "#5b74ac",
  "#4b6297",
  "#425787",
  "#354b78"
];

const theme = createTheme({
  colors: {
    blue: myColor,
  }
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider theme={theme}>
        <LayoutDefault>
          <Notifications />
          <Component {...pageProps} />
        </LayoutDefault>
      </MantineProvider>
    </SessionProvider>
  )
}

// eslint-disable-next-line
const I18nApp = appWithTranslation(MyApp, nextI18nextConfig);
// eslint-disable-next-line
const TRPCApp = api.withTRPC(I18nApp)

export default TRPCApp
