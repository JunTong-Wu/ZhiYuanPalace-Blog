// 环境变量配置
import { loadEnv } from "vite";
const envName: string = (process.env.npm_lifecycle_script as string).match(
  /--mode\s(.*)/
)?.[1] as string;
const envData = loadEnv(envName, process.cwd()); // 获取.env文件中的配置
Object.assign(process.env, envData); // 将环境配置信息，添加到process.env

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@unocss/nuxt", "@nuxtjs/i18n", "nuxt-icon"],
  i18n: {
    /* module options */
    vueI18n: "./nuxt-i18n.js", // custom path example
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
