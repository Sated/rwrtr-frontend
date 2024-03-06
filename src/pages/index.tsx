import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nConfig from '@/../next-i18next.config.mjs'
import Head from 'next/head'

import { Faq } from '@/components/Faq/Faq'
// import { HowItWorks } from '@/components/HowItWorks/HowItWorks'
import { UseCases } from '@/components/UseCases/UseCases'
import { ContentForm } from '@/components/_forms/ContentForm/ContentForm'
import { Content } from '@/components/Content/Content'
import { ContainerWrapper } from '@/components/ContainerWrapper/ContainerWrapper'
import { useContentStore } from '@/store/use-content-store'
import { useComputedColorScheme } from '@mantine/core'

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], i18nConfig, ['en', 'ru'])),
  },
})

export default function Home() {
  const { t } = useTranslation('common')
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const contentStore = useContentStore()
  const hasTranslatedContent = useContentStore((state) => state.computed.hasTranslatedContent)

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content="" />
        <meta name="theme-color" content={computedColorScheme === 'light' ? '#FFFFFF' : '#000000'} />
        <link rel="icon" href={computedColorScheme === 'dark' ? '/favicon.ico' : '/favicon-dark.ico'} />
      </Head>
      <main>
        <ContainerWrapper>
          <ContentForm />
        </ContainerWrapper>
        <ContainerWrapper fluid px={32}>
          {hasTranslatedContent && (<Content
            title={contentStore.title}
            description={contentStore.description}
            content={contentStore.content}
            translatedTitle={contentStore.translatedTitle}
            translatedDescription={contentStore.translatedDescription}
            translatedContent={contentStore.translatedContent}
          />)}
        </ContainerWrapper>
        <ContainerWrapper size={700}>
          <UseCases />
        </ContainerWrapper>
        {/*<ContainerWrapper title="How it works">*/}
        {/*  <HowItWorks />*/}
        {/*</ContainerWrapper>*/}
        <ContainerWrapper title={t('faq.title')} size={'sm'}>
          <Faq />
        </ContainerWrapper>
      </main>
    </>
  )
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession()
//
//   const { data: secretMessage } = api.post.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   )
//
//   return (
//     <div>
//       <p>
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? 'Sign out' : 'Sign in'}
//       </button>
//     </div>
//   )
// }
