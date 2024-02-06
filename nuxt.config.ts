// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  hooks: {
    "vite:extendConfig"(config) {
      delete config.define!.window;
      delete config.define!.document;
    },
  },
  devtools: { enabled: false },
  modules: ["@unocss/nuxt", "@nuxtjs/i18n"],
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
    langDir: "language",
  },
});
