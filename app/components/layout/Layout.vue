<template>
  <div id="layout-default" class="relative overflow-hidden bg-background">
    <!-- 侧边导航栏 -->
    <Sidebar class="fixed top-status bottom-0 left-0 w-sidebar z-40 bg-level-b1" />
    <!-- 整体顶栏 -->
    <Header class="fixed top-0 left-0 w-full pl-sidebar z-30 right-0 pr-toolbar" />
    <div id="layout-default-main" class="layout-default-main relative z-10 ml-sidebar mr-toolbar mt-main">
      <main class="flex-1 bg-background">
        <div class="main-view text-base relative overflow-hidden">
          <div class="main-view-inner">
            <slot />
          </div>
        </div>
      </main>
    </div>
    <!-- 工具栏 -->
    <aside class="portrait:hidden fixed z-40 top-status bottom-0 right-0 w-toolbar bg-level-b1">
      <div id="zy-tool-bar" class="absolute inset-4 top-0 rounded-lg bg-headBar backdrop-blur-3xl">
      </div>
    </aside>
    <!-- 音乐播放器 -->
    <Music
      class="fixed top-music landscape:left-4 w-music z-50 portrait:bg-headBar backdrop-blur-3xl landscape:shadow-sm" />
    <!-- 底部版权 -->
    <FooterColumns />
    <!-- 底部导航栏 -->
    <FooterNavigation class="fixed z-40 bottom-0 left-0 right-0 z-60 bg-headBar backdrop-blur-3xl" />

  </div>
</template>
<script setup lang="ts">

</script>
