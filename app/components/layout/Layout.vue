<template>
  <div
    id="layout"
    class="relative overflow-hidden bg-background"
  >
    <!-- 主体内容 -->
    <section
      id="layout-main"
      class="layout-main relative z-10 mt-main transition-all"
      :class="{
        'ml-sidebar': !isLoginLayout && !hideSidebar && !isVideoDetailLayout,
        'ml-hideSidebar': !isLoginLayout && hideSidebar && !isVideoDetailLayout,
        'mr-toolbar':
          !isLoginLayout &&
          pageHasToolbar &&
          !hideToolbar &&
          !isVideoDetailLayout,
        'mt-main': !isLoginLayout && !isVideoDetailLayout,
      }"
    >
      <main class="flex-1">
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
      <Sidebar
        :isAdminSidebar="isAdminLayout"
        :hide="hideSidebar"
        class="portrait:hidden fixed top-header bottom-0 left-0 z-40 bg-level-2 transition-all"
        :class="{
          'w-sidebar': !hideSidebar,
          'w-hideSidebar': hideSidebar,
        }"
      />
      <!-- 整体顶栏 -->
      <Header
        :pageHasToolbar="pageHasToolbar"
        :hideSidebar="hideSidebar"
        :hideToolbar="hideToolbar"
        :isAdminHeader="isAdminLayout"
        :disabledLayoutControl="!isLandscapeMdSizeFlag"
        class="fixed top-0 left-0 w-full z-30 right-0 transition-all"
        :class="{
          'pl-sidebar': !hideSidebar,
          'pl-hideSidebar': hideSidebar,
          'pr-toolbar portrait:pr-0': !hideToolbar && pageHasToolbar,
          'pr-4 portrait:pr-0': hideToolbar || !pageHasToolbar,
        }"
        @switchSidebarClick="switchSidebarStyle"
        @switchToolbarClick="switchHideToolbar"
      />
      <!-- 底部导航栏 -->
      <FooterNavigation
        v-if="!isAdminLayout && !isLoginLayout && !isVideoDetailLayout"
        class="fixed z-40 bottom-0 left-0 right-0 z-60 bg-headBar backdrop-blur-3xl"
      />
    </section>

    <!-- 工具栏 -->
    <aside
      v-show="!isLoginLayout && !isVideoDetailLayout"
      class="portrait:hidden fixed z-20 top-header bottom-0 right-0 transition-all w-toolbar"
      :class="{
        'translate-x-full': hideToolbar || !pageHasToolbar,
      }"
    >
      <div
        ref="toolBarRef"
        id="zy-tool-bar"
        class="absolute rounded bg-level-2 dark:bg-level-1 ring-1 ring-slate-100 dark:ring-slate-800 inset-6 portrait:inset-2 portrait:sm:inset-4 portrait:lg:inset-6 shadow-sm !left-0"
      >
        <!-- 在Toolbar组件中，通过Teleport穿越挂载到这里，用于解耦layout和page -->
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
    },
  });

  // 布局切换
  const hideSidebar = ref(false);
  const switchSidebarStyle = () => {
    hideSidebar.value = !hideSidebar.value;
  };

  const hideToolbar = ref(false);
  const switchHideToolbar = () => {
    hideToolbar.value = !hideToolbar.value;
  };

  const pageHasToolbar = ref(false);
  const toolBarRef = ref<HTMLDivElement | null>(null);
  // 定义 MutationObserver 实例
  let observer: MutationObserver | null = null;

  const switchPagepageHasToolbar = (enable: Boolean) => {
    if (enable) {
      pageHasToolbar.value = true;
    } else {
      pageHasToolbar.value = false;
    }
  };

  const isLandscapeMdSize = useMediaQuery(
    '(min-width: 1200px) and (orientation: landscape)',
  );
  const isLandscapeMdSizeFlag = ref(true);

  onMounted(() => {
    // 观察ToolBar DOM节点变化
    if (toolBarRef.value) {
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            if (mutation.addedNodes.length > 0) {
              // 观察对象被添加了DIV节点
              if (mutation.addedNodes[0]?.nodeName == 'DIV') {
                setTimeout(() => {
                  switchPagepageHasToolbar(true);
                }, 600);
              }
            }
            if (mutation.removedNodes.length > 0) {
              // 观察对象被删除了DIV节点
              if (mutation.removedNodes[0]?.nodeName == 'DIV') {
                switchPagepageHasToolbar(false);
              }
            }
          }
        });
      });

      // 配置观察选项
      const config = { childList: true };
      observer.observe(toolBarRef.value, config);
    }

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
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
    });
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect(); // 停止观察
      observer = null;
    }
  });
</script>
