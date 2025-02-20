// 轻量版
// import VueMarkdownEditor from '@kangc/v-md-editor'
// import '@kangc/v-md-editor/lib/style/base-editor.css'

// 预览组件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

// 主题样式
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
// import '@kangc/v-md-editor/lib/theme/style/github.css'

// 代码高亮
import Prism from 'prismjs';
// import hljs from "highlight.js";

// VueMarkdownEditor.use(vuepressTheme, {
//   Prism
// })
VMdPreview.use(vuepressTheme, {
  Prism,
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VMdPreview);
});
