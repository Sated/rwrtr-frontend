import i18nConfig from "./next-i18next.config.mjs";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: i18nConfig.i18n,

  async redirects() {
    return [
      {
        source: '/_error',
        destination: '/error',
        permanent: true,
      },
    ]
  },

  sassOptions: {
    prependData: `@import "./src/styles/_mantine.scss";`,
  },
};

export default config;
