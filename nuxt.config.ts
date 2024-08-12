// 环境变量配置
import { loadEnv } from "vite";
const envName: string = (process.env.npm_lifecycle_script as string).match(
    /--mode\s(.*)/
)?.[1] as string;
const envData = loadEnv(envName, process.cwd()); // 获取.env文件中的配置
Object.assign(process.env, envData); // 将环境配置信息，添加到process.env

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui","nuxt-headlessui","@nuxtjs/i18n"],
  future: {
    compatibilityVersion: 4,
  },
  hooks: {
    "vite:extendConfig"(config) {
      delete config.define!.window;
      delete config.define!.document;
    },
  },
  components: [
    {
      path: "components",
      pathPrefix: false,
      extensions: [".vue"],
    },
  ],
  i18n: {
    baseUrl: "https://www.yiru.love",
    locales: [
      {
        code: "zh-CN",
        name: "简体中文",
        iso: "zh-CN",
        files: ["zh/common.json"],
        dir: "ltr",
      },
      {
        code: "en",
        name: "English",
        iso: "en",
        files: ["en/common.json"],
        dir: "ltr",
      },
    ],
    defaultLocale: "zh-CN",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true,
    },
    vueI18n: "./i18n.config.ts",
    lazy: true,
    langDir: "language",
  },
})