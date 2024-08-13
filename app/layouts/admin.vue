<template>
  <div id="layout-simple" class="relative overflow-hidden">
    <header
      v-if="!isLoginPage"
      class="fixed top-0 left-0 right-0 z-40 landscape:backdrop-blur-3xl landscape:bg-bg-headBar portrait:bg-bg-opaque h-header text-text-1 overflow-hidden landscape:border-b border-borderColor"
    >
      <div
        class="zy-header-inner flex items-center justify-between h-full landscape:pr-4 portrait:pr-0 relative z-10"
      >
        <div class="flex items-center h-full overflow-hidden">
          <Logo class="w-sidebar px-4 portrait:hidden" size="small" />
          <GoBackButton />
        </div>

        <div class="portrait:hidden">
          <div class="flex justify-end h-full items-center gap-4">
            <ZyButton
              class="flex items-center justify-center"
              @click="toggleFullScreen"
              title="全屏/退出全屏"
              type="icon"
            >
              <ZyIcon
                v-if="!fullScreenFlag"
                size="1.5rem"
                defaultName="maximize"
              />
              <ZyIcon v-else size="1.5rem" defaultName="minimize" />
            </ZyButton>
            <ZyButton
              class="flex items-center justify-center"
              @click="darkModeSwitch"
              title="日间/夜间"
              type="icon"
            >
              <ZyIcon
                size="1.5rem"
                class="hidden dark:inline-block"
                defaultName="sun"
              />
              <ZyIcon size="1.5rem" class="dark:hidden" defaultName="moon" />
            </ZyButton>
            <!-- 多语言抽屉 -->
            <ZyPopover
              title="切换语言"
              background="var(--bg-panel)"
              position="bottom-right"
            >
              <template #reference>
                <ZyButton
                  class="flex items-center justify-center"
                  title="切换语言"
                  type="icon"
                >
                  <ZyIcon size="1.5rem" defaultName="language" />
                </ZyButton>
              </template>
              <template #actions>
                <LanguagePopoverInner />
              </template>
            </ZyPopover>
          </div>
        </div>
      </div>
    </header>
    <div id="layout-simple-main" class="layout-simple-main relative z-20">
      <main>
        <div class="main-view text-base relative overflow-hidden">
          <div class="main-view-inner">
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const isLoginPage = computed(() =>{ return route.path === '/login'})

// 切换全屏
const fullScreenFlag = ref(false);
const toggleFullScreen = () => {
  if (fullScreenFlag.value == false) {
    fullScreenFlag.value = true;
    fullScreen();
  } else {
    fullScreenFlag.value = false;
    fullExit();
  }
};
</script>
<style>
::view-transition-new(root),
::view-transition-old(root) {
  animation: none;
}
</style>
