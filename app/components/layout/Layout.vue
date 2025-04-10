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
        <div class="main-view text-sm relative overflow-hidden">
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
        :isDocumentSidebar="isDocumentLayout"
        :hide="hideSidebar"
        class="portrait:hidden fixed top-0 bottom-0 left-0 z-40 bg-level-2 dark:bg-level-1 transition-all border-r border-borderColor"
        :class="{
          'w-sidebar': !hideSidebar,
          'w-hideSidebar': hideSidebar,
          dark: isAdminLayout,
        }"
        @switchSidebarClick="switchSidebarStyle"
      />
      <!-- 整体顶栏 -->
      <Header
        id="zy-head-bar"
        :pageHasToolbar="pageHasToolbar"
        :hideSidebar="hideSidebar"
        :hideToolbar="hideToolbar"
        :isAdminHeader="isAdminLayout"
        :isDocumentHeader="isDocumentLayout"
        :disabledLayoutControl="!isLandscapeMdSizeFlag"
        class="fixed top-0 z-30 right-0 transition-all"
        :class="{
          'left-sidebar': !hideSidebar,
          'left-hideSidebar': hideSidebar,
          'pr-toolbar portrait:pr-0': !hideToolbar && pageHasToolbar,
          'pr-4 portrait:pr-0': hideToolbar || !pageHasToolbar,
        }"
        @switchToolbarClick="switchHideToolbar"
      />
      <!-- 底部导航栏 -->
      <FooterNavigation
        v-if="
          !isAdminLayout &&
          !isLoginLayout &&
          !isVideoDetailLayout &&
          !isDocumentLayout
        "
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
        class="absolute inset-8 !left-0"
      >
        <!-- 在Toolbar组件中，通过Teleport穿越挂载到这里，用于解耦layout和page -->
      </div>
    </aside>
  </div>
</template>
<script setup lang="ts">
  import { useMediaQuery } from "@vueuse/core";

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
    isDocumentLayout: {
      type: Boolean,
      default: false,
    },
  });

  const route = useRoute();

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
    "(min-width: 1200px) and (orientation: landscape)",
  );
  const isLandscapeMdSizeFlag = ref(true);

  onMounted(() => {
    // 观察ToolBar DOM节点变化
    if (toolBarRef.value) {
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            if (mutation.addedNodes.length > 0) {
              // 观察对象被添加了DIV节点
              if (mutation.addedNodes[0]?.nodeName == "DIV") {
                setTimeout(() => {
                  switchPagepageHasToolbar(true);
                }, 600);
              }
            }
            if (mutation.removedNodes.length > 0) {
              // 观察对象被删除了DIV节点
              if (mutation.removedNodes[0]?.nodeName == "DIV") {
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
    window.addEventListener("resize", () => {
      setTimeout(() => {
        if (!isLandscapeMdSize.value) {
          isLandscapeMdSizeFlag.value = false;
          hideSidebar.value = true;
          hideToolbar.value = true;
          if (route.path.startsWith("/doc")) {
            hideSidebar.value = false;
          }
        } else {
          isLandscapeMdSizeFlag.value = true;
          hideSidebar.value = false;
          hideToolbar.value = false;
        }
      }, 20);
    });
  });
  // 监听路由变化，切换布局
  watch(
    () => route.path,
    (newPath) => {
      if (newPath.startsWith("/doc")) {
        hideSidebar.value = false;
      }
    },
  );

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect(); // 停止观察
      observer = null;
    }
  });
</script>
