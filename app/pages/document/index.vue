<template>
  <CommonMainSection full-width>
    <div class="bg-level-background min-h-screen">

    <!-- 页面主体 -->
    <main class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-text-1 mb-4">欢迎来到项目开发文档</h1>
      <p class="text-text-2 mb-8">这里是项目的配套开发文档，帮助你快速上手和了解项目的各个方面。</p>

      <!-- 主要内容区域 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- 卡片 1 -->
        <div class="bg-level-2 shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-text-1 mb-2">快速开始</h2>
          <p class="text-text-2 mb-4">了解如何快速搭建项目开发环境，开始编写代码。</p>
          <a href="#" class="text-blue-500 hover:underline">查看详情</a>
        </div>

        <!-- 卡片 2 -->
        <div class="bg-level-2 shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-text-1 mb-2">组件文档</h2>
          <p class="text-text-2 mb-4">查看项目中使用的所有组件，包括用法和示例。</p>
          <a href="#" class="text-blue-500 hover:underline">查看详情</a>
        </div>

        <!-- 卡片 3 -->
        <div class="bg-level-2 shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-text-1 mb-2">API 文档</h2>
          <p class="text-text-2 mb-4">了解项目的 API 接口，包括请求参数和返回值。</p>
          <a href="#" class="text-blue-500 hover:underline">查看详情</a>
        </div>
      </div>
    </main>
  </div>
  </CommonMainSection>
  
</template>

<script>
export default {
  name: 'DocumentHomePage'
}
</script>

<style scoped>
/* 可以在这里添加自定义样式 */
</style>
