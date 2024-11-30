<template>
  <div id="layout" class="relative overflow-hidden bg-background">
    <!-- 侧边导航栏 -->
    <Sidebar :isAdminSidebar="isAdminLayout" class="fixed top-status bottom-0 left-0 w-sidebar z-40 bg-level-b1" />
    <!-- 整体顶栏 -->
    <Header :isAdminHeader="isAdminLayout" class="fixed top-0 left-0 w-full pl-sidebar z-30 right-0 "
      :class="{ 'pr-toolbar': !isAdminLayout, 'pr-4 portrait:pr-0': isAdminLayout }" />
    <div id="layout-main" class="layout-main relative z-10 ml-sidebar mt-main"
      :class="{ 'mr-toolbar': !isAdminLayout, 'mr-4': isAdminLayout }">
      <main class="flex-1 bg-background">
        <div class="main-view text-base relative overflow-hidden">
          <div class="main-view-inner">
            <slot />
          </div>
        </div>
      </main>
    </div>
    <!-- 工具栏 -->
    <aside class="portrait:hidden fixed z-40 top-status bottom-0 right-0 bg-level-b1"
      :class="{ 'w-toolbar': !isAdminLayout, 'w-4': isAdminLayout }">
      <div v-show="!isAdminLayout" id="zy-tool-bar"
        class="absolute inset-4 top-0 rounded-lg bg-headBar backdrop-blur-3xl">
      </div>
    </aside>
    <!-- 音乐播放器 -->
    <Music class="fixed top-music landscape:left-4 w-music z-50 portrait:bg-headBar backdrop-blur-3xl landscape:shadow-sm"
      :class="{
        'landscape:hidden': isAdminLayout,
      }" />
    <!-- 底部版权 -->
    <FooterColumns v-if="!isAdminLayout" />
    <!-- 底部导航栏 -->
    <FooterNavigation v-if="!isAdminLayout"
      class="fixed z-40 bottom-0 left-0 right-0 z-60 bg-headBar backdrop-blur-3xl" />

  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  isAdminLayout: {
    type: Boolean,
    default: false,
  },
});
watch(() => props.isAdminLayout, () => {
  if (props.isAdminLayout) {
    console.log("isAdminLayout");

  }
});
</script>
