import { PageNotFound } from '@/components/PageNotFound/PageNotFound'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nConfig from '@/../next-i18next.config.mjs'

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], i18nConfig, [
      "en",
      "ru",
    ])),
  },
});

export default function NotFoundPage() {
  return (<PageNotFound />);
}