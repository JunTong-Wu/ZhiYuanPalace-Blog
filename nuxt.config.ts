// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { mode: "out-in" },
  },
  hooks: {
    "vite:extendConfig"(config) {
      delete config.define!.window;
      delete config.define!.document;
    },
  },
  devtools: { enabled: false },
  modules: ["@unocss/nuxt", "@nuxtjs/i18n"],
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
});
