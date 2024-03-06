import { Head, Html, Main, NextScript } from 'next/document';
import { ColorSchemeScript } from '@mantine/core';
import i18nextConfig from '@/../next-i18next.config.mjs';

export default function Document() {
  const currentLocale: string = i18nextConfig.i18n.defaultLocale

  return (
    <Html lang={currentLocale}>
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  );
}