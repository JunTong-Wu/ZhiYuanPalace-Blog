import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetWebFonts,
  transformerDirectives,
  transformerCompileClass,
  transformerVariantGroup,
} from "unocss";
import { presetGrid } from "unocss-preset-grid";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      provider: "google", // default provider
      fonts: {
        // these will extend the default theme
        sans: ["Roboto", "Roboto:400,500,600,700,800,900"],
      },
    }),
    presetGrid(),
    // ...
  ],
  transformers: [
    transformerDirectives(),
    transformerCompileClass(),
    transformerVariantGroup(),
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
        7: "#454de3", //点击
        6: "#6269e7", //常规
        5: "#7f85eb", //悬浮
        4: "#9da1ef", //特殊场景
        3: "#babcf3", //一般禁用
        2: "#d7d8f7", //文字禁用
        1: "#f4f4fb", //浅色/白底悬浮
      },
      //成功色
      success: {
        7: "#149a2f", //点击
        6: "#19b332", //常规
        5: "#2fc248", //悬浮
        4: "#52d167", //特殊场景
        3: "#7ee18a", //一般禁用
        2: "#b1f0b6", //文字禁用
        1: "#e9ffea", //浅色/白底悬浮
      },
      //文字颜色
      text: {
        1: "#1d2129", //强调/正文标题
        2: "#4f5969", //次强调/正文标题
        3: "#87909c", //次要信息
        4: "#c9cdd4", //置灰信息
        dark: {
          1: "#f6f6f6", //强调/正文标题
          2: "#c5c5c5", //次强调/正文标题
          3: "#929293", //次要信息
          4: "#5f5f60", //置灰信息
        },
      },
      //背景颜色
      bg: {
        1: "#ffffff", //整体背景色
        2: "#ffffff", //一级容器背景
        3: "#ffffff", //二级容器背景
        4: "#ffffff", //三级容器背景
        5: "#ffffff", //下拉弹出框、Tooltip 背景颜色
        6: "#ffffff", //白色背景
        dark: {
          1: "#17171a", //整体背景色
          2: "#232324", //一级容器背景
          3: "#2a2a2b", //二级容器背景
          4: "#313132", //三级容器背景
          5: "#373739", //下拉弹出框、Tooltip 背景颜色
          6: "#f6f6f6", //白色背景
        },
      },
    },
  },
});
