// https://nuxt.com/docs/api/configuration/nuxt-config
import compression from 'vite-plugin-compression';
export default defineNuxtConfig({
  runtimeConfig: {
    //私密
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    AES_KEY: process.env.AES_KEY,
    AES_IV: process.env.AES_IV,
    public: {
      //公开
      API_URL: process.env.API_URL,
      CDN_URL: process.env.CDN_URL,
      SITE_URL: process.env.SITE_URL,
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  app: {
    pageTransition: { mode: 'out-in' },
  },
  ui: {
    safelistColors: ['theme'],
  },
  hooks: {
    'vite:extendConfig'(config) {
      delete config.define!.window;
      delete config.define!.document;
    },
  },
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-echarts',
  ],
  components: [
    {
      path: 'components',
      pathPrefix: false,
      extensions: ['.vue'],
    },
  ],
  imports: {
    dirs: ['@/stores/index.{ts,js,mjs,mts}'],
  },
  i18n: {
    baseUrl: process.env.SITE_URL,
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts',
  },
  echarts: {
    renderer: 'svg',
    charts: ['PieChart', 'GaugeChart'],
    components: ['TitleComponent', 'LegendComponent', 'TooltipComponent'],
  },
  vite: {
    plugins: [
      compression({
        algorithm: 'gzip', // 使用 gzip 压缩
        ext: '.gz', // 压缩后的文件扩展名
      }),
    ],
  },
  compatibilityDate: '2024-08-12',
});
