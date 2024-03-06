import path from "path";

const isDev = process.env.NODE_ENV === 'development'

/** @type {import("next-i18next").UserConfig} */
const config = {
  debug: isDev,
  reloadOnPrerender: isDev,
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
    localeDetection: true,
  },
  localePath: path.resolve("./public/locales"),
  serializeConfig: false,
};
export default config;