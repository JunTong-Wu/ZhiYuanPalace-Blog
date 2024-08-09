/*
 * @Author: Nick juntong.wu@travel-easy.com
 * @Date: 2024-08-07 18:20:48
 * @LastEditors: Nick juntong.wu@travel-easy.com
 * @LastEditTime: 2024-08-08 15:12:06
 * @FilePath: \zyp-next\nuxt.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 环境变量配置
import { loadEnv } from "vite";
const envName: string = (process.env.npm_lifecycle_script as string).match(
  /--mode\s(.*)/
)?.[1] as string;
const envData = loadEnv(envName, process.cwd()); // 获取.env文件中的配置
Object.assign(process.env, envData); // 将环境配置信息，添加到process.env

// https://nuxt.com/docs/api/configuration/nuxt-config
import compression from "vite-plugin-compression";
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  app: {
    pageTransition: { mode: "out-in" },
    layoutTransition: { mode: "out-in" },
  },
  hooks: {
    "vite:extendConfig"(config) {
      delete config.define!.window;
      delete config.define!.document;
    },
  },
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "nuxt-headlessui", "@nuxtjs/i18n"],
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
  vite: {
    plugins: [
      compression({
        algorithm: "gzip", // 使用 gzip 压缩
        ext: ".gz", // 压缩后的文件扩展名
      }),
    ],
  },
});