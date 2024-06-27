import {
  defineConfig,
  presetUno,
  //presetAttributify,
  transformerDirectives,
  transformerCompileClass,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    // presetAttributify(),
    // ...
  ],
  transformers: [
    transformerDirectives(),
    transformerCompileClass(),
    transformerVariantGroup(),
  ],
  rules: [
    ["h-header", { height: "var(--header-bar-height)" }],
    ["w-header", { width: "var(--header-bar-height)" }],
    ["h-footer", { height: "var(--footer-bar-height)" }],
    ["w-sidebar", { width: "var(--side-bar-width)" }],
    ["w-toolbar", { width: "var(--tool-bar-width)" }],
    ["left-sidebar", { left: "var(--side-bar-width)" }],
    ["right-toolbar", { right: "var(--tool-bar-width)" }],
    [
      "w-sidebar-toolbar",
      { width: "calc( var(--side-bar-width) + var(--tool-bar-width) )" },
    ],
    [
      "left-sidebar-toolbar",
      { left: "calc( var(--side-bar-width) + var(--tool-bar-width) )" },
    ],
    ["pl-sidebar", { "padding-left": "var(--side-bar-width)" }],
    [
      "pl-sidebar-toolbar",
      {
        "padding-left": "calc( var(--side-bar-width) + var(--tool-bar-width) )",
      },
    ],
    ["pr-toolbar", { "padding-right": "var(--tool-bar-width)" }],
    ["mt-header", { "margin-top": "var(--header-bar-height)" }],
    ["top-header", { top: "var(--header-bar-height)" }],
    ["w-centered", { "max-width": "var(--centered-width)" }],
    ["h-music", { height: "var(--music-bar-height)" }],
    ["w-music", { width: "var(--music-bar-width)" }],
    ["top-music", { top: "var(--music-bar-top)" }],
    ["pt-main", { "padding-top": "var(--pt-main)" }],
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
      theme: "var(--theme-color)",
      //文字颜色
      text: {
        1: "var(--text-1)",
        2: "var(--text-2)",
        3: "var(--text-3)",
        4: "var(--text-4)",
        5: "var(--text-5)",
      },
      //背景颜色
      bg: {
        best: "var(--bg-best)",
        card: "var(--bg-card)",
        panel: "var(--bg-panel)",
        transparent: "transparent",
        mask: "var(--bg-mask)",
        primary: "var(--primary-5)",
        opaque: "var(--bg-opaque)",
      },
      bordercolor: "var(--border-color)",
      themeColorTranslucent: "var(--theme-color-translucent)",
      sideBar: "var(--bg-side-bar)",
    },
  },
});
