import { defineConfig } from "vite";
import Markdown from "vite-plugin-md";

export default defineConfig({
  plugins: [
    Markdown({
      // 配置项
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      transforms: {
        before: (code) => {
          return code.toString("utf-8");
        },
      },
    }),
  ],
});
