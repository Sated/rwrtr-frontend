declare module "bar" {
  import { type UserConfig } from 'next-i18next'
  const config: UserConfig;
  export = config;
}