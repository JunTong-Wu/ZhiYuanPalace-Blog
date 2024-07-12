/*
 * @Author: Nick juntong.wu@travel-easy.com
 * @Date: 2024-07-12 20:55:48
 * @LastEditors: Nick juntong.wu@travel-easy.com
 * @LastEditTime: 2024-07-12 21:08:45
 * @FilePath: \zyp-next\tailwind.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Config } from "tailwindcss";
export default <Partial<Config>>{
  darkMode: "selector",
  theme: {
    extend: {
      height: {
        header: "var(--header-bar-height)",
        footer: "var(--footer-bar-height)",
        music: "var(--music-bar-height)",
      },
      width: {
        header: "var(--header-bar-height)",
        sidebar: "var(--side-bar-width)",
        toolbar: "var(--tool-bar-width)",
        "sidebar-toolbar":
          "calc(var(--side-bar-width) + var(--tool-bar-width))",
        centered: "var(--centered-width)",
        music: "var(--music-bar-width)",
      },
      inset: {
        sidebar: "var(--side-bar-width)",
        toolbar: "var(--tool-bar-width)",
        "sidebar-toolbar":
          "calc(var(--side-bar-width) + var(--tool-bar-width))",
        header: "var(--header-bar-height)",
        music: "var(--music-bar-top)",
      },
      padding: {
        sidebar: "var(--side-bar-width)",
        "sidebar-toolbar":
          "calc(var(--side-bar-width) + var(--tool-bar-width))",
        toolbar: "var(--tool-bar-width)",
        main: "var(--pt-main)",
      },
      margin: {
        header: "var(--header-bar-height)",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        theme: "var(--theme-color)",
        text: {
          1: "var(--text-1)",
          2: "var(--text-2)",
          3: "var(--text-3)",
          4: "var(--text-4)",
          5: "var(--text-5)",
        },
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
      screens: {
        xs: "600px",
        sm: "900px",
        md: "1200px",
        lg: "1500px",
        xl: "1800px",
      },
    },
  },
  plugins: [],
};
