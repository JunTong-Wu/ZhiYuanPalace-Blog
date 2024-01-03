// 环境变量配置
import { loadEnv } from "vite";
const envName: string = (process.env.npm_lifecycle_script as string).match(
  /--mode\s(.*)/
)?.[1] as string;
const envData = loadEnv(envName, process.cwd()); // 获取.env文件中的配置
Object.assign(process.env, envData); // 将环境配置信息，添加到process.env

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    // head设置
    head: {
      htmlAttrs: {
        lang: "zh-CN",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "shortcut icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
    },
    // 过渡
    // pageTransition: { name: 'page', mode: 'out-in' },
    // layoutTransition: { name: "layout", mode: "out-in" },
  },
  devtools: { enabled: false },
  modules: ["@unocss/nuxt", "@nuxtjs/i18n", "@nuxtjs/strapi", "nuxt-icon"],
  strapi: {
    url: import.meta.env.VITE_APP_API_BASE,
  },
  i18n: {
    locales: [
      {
        code: "zh-CN",
        name: "简体中文",
        iso: "zh-CN",
        files: ["zh/common.json", "zh/tips.json"],
        dir: "ltr",
      },
      {
        code: "en",
        name: "English",
        iso: "en",
        files: ["en/common.json", "en/tips.json"],
        dir: "ltr",
      },
    ],
    defaultLocale: "zh-CN",
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
    },
    vueI18n: "./i18n.config.ts",
    lazy: true,
    langDir: "src/core/language",
  },
  dir: {
    assets: "src/assets",
    layouts: "src/design/layouts",
    pages: "src/design/pages",
    plugins: "src/core/plugins",
  },
  components: [
    {
      path: "src/design/components",
      pathPrefix: false,
      extensions: [".vue"],
    },
  ],
});
