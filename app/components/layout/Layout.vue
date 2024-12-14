<template>
  <div id="layout" class="relative overflow-hidden bg-background">
    <!-- 主体内容 -->
    <section id="layout-main" class="layout-main relative z-10 mt-main transition-all" :class="{
      'ml-sidebar': !isLoginLayout && !hideSidebar,
      'ml-hideSidebar': !isLoginLayout && hideSidebar,
      'mr-toolbar': !isAdminLayout && !isLoginLayout,
      'mr-4': isAdminLayout,
      'mt-main': !isLoginLayout
    }
      ">
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
      <Sidebar :isAdminSidebar="isAdminLayout" :hide="hideSidebar"
        class="portrait:hidden fixed top-header bottom-0 left-0 z-40 bg-level-b1 transition-all" :class="{
          'w-sidebar': !hideSidebar,
          'w-hideSidebar': hideSidebar,
        }" />
      <!-- 整体顶栏 -->
      <Header :hideSidebar="hideSidebar" :isAdminHeader="isAdminLayout"
        class="fixed top-0 left-0 w-full z-30 right-0 transition-all" :class="{
          'pl-sidebar': !hideSidebar,
          'pl-hideSidebar': hideSidebar,
          'pr-4 md:pr-toolbar portrait:pr-0': !isAdminLayout,
          'pr-4 portrait:pr-0': isAdminLayout
        }" @switchSidebarClick="switchSidebarStyle" @switchToolbarClick="switchToolbarStyle" />
      <!-- 底部版权 -->
      <FooterColumns v-if="!isAdminLayout" class="landscape:pr-toolbar" :class="{
        'landscape:pl-sidebar': !hideSidebar,
        'landscape:pl-hideSidebar': hideSidebar,
      }" />
      <!-- 底部导航栏 -->
      <FooterNavigation v-if="!isAdminLayout"
        class="fixed z-40 bottom-0 left-0 right-0 z-60 bg-headBar backdrop-blur-3xl" />
    </section>

    <!-- 工具栏 -->
    <aside v-show="!isLoginLayout" class="portrait:hidden fixed z-20 top-header bottom-0 right-0 bg-level-b1"
      :class="{ 'w-4 md:w-toolbar portrait:w-0': !isAdminLayout, 'w-4': isAdminLayout }">
      <div id="zy-tool-bar" class="absolute inset-4 top-0 rounded-lg bg-headBar backdrop-blur-3xl">
      </div>
    </aside>
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

// 布局切换
const hideSidebar = ref(false);
const switchSidebarStyle = () => {
  hideSidebar.value = !hideSidebar.value;

};
const hideToolbar = ref(false);
const switchToolbarStyle = () => {
  hideToolbar.value = !hideToolbar.value;
};

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
