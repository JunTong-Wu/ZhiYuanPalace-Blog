// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@unocss/nuxt"],
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
