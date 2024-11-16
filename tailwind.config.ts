import type { Config } from "tailwindcss";
export default <Partial<Config>>{
  darkMode: "selector",
  theme: {
    fontFamily: {
      vivo: [
        "vivoTypeRegular",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      montserrat: ["Montserrat", "Helvetica", "sans-serif"],
    },
    extend: {
      aspectRatio: {
        auto: "auto",
        square: "1 / 1",
        video: "16 / 9",
      },
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
        header: "var(--header-bar-height)",
        main: "var(--pt-main)",
        footer: "var(--footer-bar-height)",
      },
      margin: {
        header: "var(--header-bar-height)",
        toolbar: "var(--tool-bar-width)",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        theme: {
          50: "var(--theme-color-50)",
          100: "var(--theme-color-100)",
          200: "var(--theme-color-200)",
          300: "var(--theme-color-300)",
          400: "var(--theme-color-400)",
          500: "var(--theme-color-500)",
          600: "var(--theme-color-600)",
          700: "var(--theme-color-700)",
          800: "var(--theme-color-800)",
          900: "var(--theme-color-900)",
          950: "var(--theme-color-950)",
        },
        text: {
          1: "var(--text-1)",
          2: "var(--text-2)",
          3: "var(--text-3)",
          4: "var(--text-4)",
          5: "var(--text-5)",
        },
        headBar: "var(--bg-head-bar)",
        background: "var(--bg-background)",
        borderColor: "var(--border-color)",
        mask: "var(--bg-mask)",
        level: {
          b1: "var(--bg-level-b1)",
          1: "var(--bg-level-1)",
          2: "var(--bg-level-2)",
          3: "var(--bg-level-3)",
          4: "var(--bg-level-4)",
          5: "var(--bg-level-5)",
        },
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
