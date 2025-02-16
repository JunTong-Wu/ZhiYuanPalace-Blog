<template>
  <div id="layout" class="relative overflow-hidden bg-background">
    <!-- 主体内容 -->
    <section id="layout-main" class="layout-main relative z-10 mt-main transition-all" :class="{
      'ml-sidebar': !isLoginLayout && !hideSidebar && !isVideoDetailLayout,
      'ml-hideSidebar': !isLoginLayout && hideSidebar && !isVideoDetailLayout,
      'mr-toolbar': !isAdminLayout && !isLoginLayout && !hideToolbar && !isVideoDetailLayout,
      'mr-4 portrait:mr-0': isAdminLayout || hideToolbar,
      'mt-main': !isLoginLayout && !isVideoDetailLayout
    }
      ">
      <main class="flex-1 bg-background border-r-[1rem] -mr-4 border-r-level-b1">
        <div class="main-view text-base relative overflow-hidden">
          <div class="main-view-inner">
            <slot />
          </div>
        </div>
        <!-- 底部版权 -->
        <FooterColumns v-if="!isAdminLayout && !isVideoDetailLayout" />
      </main>
    </section>

    <!-- 固定布局 -->
    <section v-if="!isLoginLayout && !isVideoDetailLayout">
      <!-- 侧边导航栏 -->
      <Sidebar :isAdminSidebar="isAdminLayout" :hide="hideSidebar"
        class="portrait:hidden fixed top-header bottom-0 left-0 z-40 bg-level-b1 transition-all" :class="{
          'w-sidebar': !hideSidebar,
          'w-hideSidebar': hideSidebar,
        }" />
      <!-- 整体顶栏 -->
      <Header :hideSidebar="hideSidebar" :hideToolbar="hideToolbar" :isAdminHeader="isAdminLayout"
        :disabledLayoutControl="!isLandscapeMdSizeFlag" class="fixed top-0 left-0 w-full z-30 right-0 transition-all"
        :class="{
          'pl-sidebar': !hideSidebar,
          'pl-hideSidebar': hideSidebar,
          'pr-toolbar portrait:pr-0': !isAdminLayout && !hideToolbar,
          'pr-4 portrait:pr-0': isAdminLayout || hideToolbar,
        }" @switchSidebarClick="switchSidebarStyle" @switchToolbarClick="switchToolbarStyle" />
      <!-- 底部导航栏 -->
      <FooterNavigation v-if="!isAdminLayout && !isVideoDetailLayout"
        class="fixed z-40 bottom-0 left-0 right-0 z-60 bg-headBar backdrop-blur-3xl" />
    </section>

    <!-- 工具栏 -->
    <aside v-show="!isLoginLayout && !isVideoDetailLayout"
      class="portrait:hidden fixed z-20 top-header bottom-0 right-0 bg-level-b1 transition-all" :class="{
        'w-toolbar': !isAdminLayout,
        'w-0': isAdminLayout,
        'translate-x-full': hideToolbar
      }
        ">
      <div id="zy-tool-bar" class="absolute inset-4 top-0 rounded-lg bg-headBar backdrop-blur-3xl">
      </div>
    </aside>
  </div>
</template>
<script setup lang="ts">
  import { useMediaQuery } from '@vueuse/core';

  const props = defineProps({
    isAdminLayout: {
      type: Boolean,
      default: false,
    },
    isLoginLayout: {
      type: Boolean,
      default: false,
    },
    isVideoDetailLayout: {
      type: Boolean,
      default: false,
    }
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

  const isLandscapeMdSize = useMediaQuery("(min-width: 1200px) and (orientation: landscape)");
  const isLandscapeMdSizeFlag = ref(true);


  onMounted(() => {
    // 监听窗口大小变化
    window.addEventListener("resize", () => {
      setTimeout(() => {
        if (!isLandscapeMdSize.value) {
          isLandscapeMdSizeFlag.value = false;
          hideSidebar.value = true;
          hideToolbar.value = true;
        } else {
          isLandscapeMdSizeFlag.value = true;
          hideSidebar.value = false;
          hideToolbar.value = false;
        }
      }, 20);
    })
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
