<template>
  <CommonMainSection full-width>
    <div class="bg-level-background min-h-screen">
      <!-- 页面主体 -->
      <main class="container mx-auto px-4 py-8">
        <div class="flex flex-col justify-center items-center">
          <div class="h-48 w-48 mb-12">
            <img
              class="h-full w-full object-cover"
              src="@/assets/image/logo-2.png"
              alt=""
            />
          </div>
          <h1 class="text-3xl font-bold text-text-1 mb-4">知鸢宫开发文档</h1>
          <p class="text-text-2 mb-8">
            这里是知鸢宫的配套开发文档，帮助你快速上手和了解项目的各个方面。
          </p>

          <div
            class="grid portrait:grid-cols-1 landscape:grid-cols-3 gap-8 mb-24"
          >
            <ZyButton
              size="large"
              @click="$router.push('/doc/guide/getting-started')"
              >快速上手</ZyButton
            >
            <ZyButton
              size="large"
              type="linear"
              class=""
              >组件库</ZyButton
            >
            <ZyButton
              size="large"
              type="linear"
              class=""
              >API</ZyButton
            >
          </div>
        </div>
        <!-- 主要内容区域 -->
        <div class="grid portrait:grid-cols-1 landscape:grid-cols-3 gap-8">
          <div class="bg-level-2 rounded-lg p-6">
            <h2 class="text-xl font-bold text-text-1 mb-2">
              Nuxt3 全栈 SSR 框架
            </h2>
            <p class="text-text-2 mb-4">
              基于 Nuxt 3 框架的服务端渲染，搭配 Nuxt Nitro server 后端开发
            </p>
          </div>
          <div class="bg-level-2 rounded-lg p-6">
            <h2 class="text-xl font-bold text-text-1 mb-2">
              TypeScript 统一类型定义
            </h2>
            <p class="text-text-2 mb-4">
              创新性使用TypeScript & new
              Class，统一了前端和后端的类型定义和初始值
            </p>
          </div>
          <div class="bg-level-2 rounded-lg p-6">
            <h2 class="text-xl font-bold text-text-1 mb-2">超级响应式</h2>
            <p class="text-text-2 mb-4">
              多达12种屏幕尺寸的响应样式，达到所有屏幕宽度最佳显示效果
            </p>
          </div>
          <div class="bg-level-2 rounded-lg p-6">
            <h2 class="text-xl font-bold text-text-1 mb-2">同步移动交互</h2>
            <p class="text-text-2 mb-4">
              封装交互逻辑，部分组件手势功能优异，按住、拖动、松手一气呵成
            </p>
          </div>
          <div class="bg-level-2 rounded-lg p-6">
            <h2 class="text-xl font-bold text-text-1 mb-2">CardOpen 动画</h2>
            <p class="text-text-2 mb-4">
              攻克 web 卡片展开动画难题，实现了仿 App Store 的卡片展开效果
            </p>
          </div>
          <div class="bg-level-2 rounded-lg p-6">
            <h2 class="text-xl font-bold text-text-1 mb-2">Music Player</h2>
            <p class="text-text-2 mb-4">
              美观且强大的音乐播放器，支持歌词同步显示，支持多种播放模式
            </p>
          </div>
        </div>
      </main>
    </div>
  </CommonMainSection>
</template>

<script>
  export default {
    name: "DocumentHomePage",
  };
</script>

<style scoped>
  /* 可以在这里添加自定义样式 */
</style>
