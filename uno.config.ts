import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerDirectives,
  transformerCompileClass,
  transformerVariantGroup,
} from "unocss";
import { presetGrid } from "unocss-preset-grid";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetGrid(),
    // ...
  ],
  transformers: [
    transformerDirectives(),
    transformerCompileClass(),
    transformerVariantGroup(),
  ],
  rules: [
    ["h-header", { height: "var(--header-bar-height)" }],
    ["h-footer", { height: "var(--footer-bar-height)" }],
    ["w-sidebar", { width: "var(--side-bar-width)" }],
  ],
  theme: {
    darkMode: "class",
    breakpoints: {
      xs: "600px",
      sm: "900px",
      md: "1200px",
      lg: "1500px",
      xl: "1800px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      //主色
      primary: {
        7: "var(--primary-7)",
        6: "var(--primary-6)",
        5: "var(--primary-5)",
        4: "var(--primary-4)",
        3: "var(--primary-3)",
        2: "var(--primary-2)",
        1: "var(--primary-1)",
      },
      //文字颜色
      text: {
        1: "var(--text-1)",
        2: "var(--text-2)",
        3: "var(--text-3)",
        4: "var(--text-4)",
      },
      //背景颜色
      bg: {
        best: "var(--bg-best)",
        1: "var(--bg-1)",
        2: "var(--bg-2)",
        3: "var(--bg-3)",
        4: "var(--bg-4)",
        5: "var(--bg-5)",
        transparent: "transparent",
        mask: "var(--bg-mask)",
      },
      bordercolor: "rgba(127,127,127,0.1)",
    },
  },
});
