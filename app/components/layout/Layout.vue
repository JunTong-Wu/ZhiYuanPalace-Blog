<template>
  <div id="layout" class="relative overflow-hidden bg-background">
    <!-- 主体内容 -->
    <section id="layout-main" class="layout-main relative z-10 mt-main"
      :class="{ 'ml-sidebar': !isLoginLayout, 'mr-toolbar': !isAdminLayout && !isLoginLayout, 'mr-4': isAdminLayout, 'mt-main': !isLoginLayout }">
      <main class="flex-1 bg-background">
        <div class="main-view text-base relative overflow-hidden">
          <div class="main-view-inner">
            <slot />
          </div>
        </div>
      </main>
    </section>
    <!-- 固定布局 -->
    <section v-if="!isLoginLayout">
      <!-- 侧边导航栏 -->
      <Sidebar :isAdminSidebar="isAdminLayout" class="fixed top-header bottom-0 left-0 w-sidebar z-40 bg-level-b1" />
      <!-- 整体顶栏 -->
      <Header :isAdminHeader="isAdminLayout" class="fixed top-0 left-0 w-full pl-sidebar z-30 right-0 "
        :class="{ 'pr-4 md:pr-toolbar portrait:pr-0': !isAdminLayout, 'pr-4 portrait:pr-0': isAdminLayout }" />
      <!-- 工具栏 -->
      <aside class="portrait:hidden fixed z-20 top-header bottom-0 right-0 bg-level-b1"
        :class="{ 'w-4 md:w-toolbar portrait:w-0': !isAdminLayout, 'w-4': isAdminLayout }">
        <div v-show="!isAdminLayout" id="zy-tool-bar"
          class="absolute inset-4 top-0 rounded-lg bg-headBar backdrop-blur-3xl">
        </div>
      </aside>
      <!-- 底部版权 -->
      <FooterColumns v-if="!isAdminLayout" />
      <!-- 底部导航栏 -->
      <FooterNavigation v-if="!isAdminLayout"
        class="fixed z-40 bottom-0 left-0 right-0 z-60 bg-headBar backdrop-blur-3xl" />
    </section>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  isAdminLayout: {
    type: Boolean,
    default: false,
  },
  isLoginLayout: {
    type: Boolean,
    default: false,
  },
});
watch(() => props.isAdminLayout, () => {
  if (props.isAdminLayout) {
    console.log("isAdminLayout");

  }
});
watch(() => props.isLoginLayout, () => {
  if (props.isLoginLayout) {
    console.log("isLoginLayout");
  }
});
</script>
