import enLang from "@/language/en";
import zhLang from "@/language/zh";

const messages = {
  en: enLang,
  zh: zhLang,
};

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "zh",
  fallbackLocale: "zh",
  globalInjection: true,
  messages,
}));
