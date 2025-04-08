<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>安装</h2>
        <h3>依赖环境</h3>
        <ul>
          <li>nodejs >= 20.0.0</li>
          <li>包管理器，如 pnpm、yarn、npm 等。</li>
        </ul>
        <h3>安装项目依赖</h3>
        <pre><code class="language-bash"> yarn install </code></pre>
        <h2>运行</h2>
        <h3>开发环境</h3>
        <pre><code class="language-bash"> yarn dev </code></pre>
        <h3>生产环境</h3>
        <pre><code class="language-bash"> yarn build </code></pre>
        <pre><code class="language-bash"> yarn generate </code></pre>
        <h2>项目结构</h2>
        <pre><code class="language-bash"
        >├─ app // 前端程序
│  ├─ assets // 编译资源
│  ├─ components // 组件
│  ├─ language // 国际化
│  ├─ middleware // 中间件
│  ├─ pages // 页面
│  ├─ plugins // 插件
│  ├─ routers // 路由
│  ├─ stores // 状态管理
│  ├─ utils // 工具
│  ├─ app.config.ts // 应用配置文件
│  ├─ app.vue // 应用入口文件
│  ├─ error.vue // 错误页面
│  └─ router.options.ts // 重写Nuxt3路由配置
│
├─ models // 统一模型层
│  └─ ...
│
├─ public // 静态资源
│  └─ ...
│
├─ server // 后端程序
│  ├─ api // 接口
│  ├─ utils // 工具
│  └─ ...
│
├─ package.json   // 项目配置文件
├─ tsconfig.json   // TypeScript 配置文件
├─ .gitignore      // Git 忽略文件
├─ .prettierrc  // Prettier 配置文件
├─ .env.development // 开发环境变量配置文件
├─ .env.production // 生产环境变量配置文件
├─ .git // Git 版本控制目录
├─ .gitignore // Git 忽略文件
├─ .gitlab-ci.yml // GitLab CI/CD 配置文件
├─ i18n.config.ts // i18n 配置文件
├─ nuxt.config.ts // Nuxt 配置文件
├─ tailwind.config.ts // Tailwind CSS 配置文件
├─ yarn.lock // 依赖锁文件
├─ README.md // 项目说明文件
└─ ...</code></pre>
      </div>
    </div>
  </CommonMainSection>
</template>
<script setup lang="ts">
  import Prism from "prismjs";
  onMounted(() => {
    Prism.highlightAll();
  });
  onUpdated(() => {
    Prism.highlightAll();
  });
</script>
