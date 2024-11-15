<template>
  <header>
    <div
      class="absolute top-0 h-full w-full landscape:bg-bg-headBar portrait:bg-theme-500 portrait:dark:brightness-[.5] landscape:backdrop-blur-3xl">
    </div>
    <div
      class="landscape:hidden absolute top-0 h-full w-full bg-gradient-to-r from-theme-500 to-transparent pointer-events-none dark:brightness-50 mix-blend-multiply">
    </div>
    <div class="portrait:hidden absolute top-0 h-full w-full">
      <div
        class="absolute top-0 h-full w-full bg-gradient-to-b from-theme-500 to-musicBar pointer-events-none opacity-10">
      </div>
    </div>
    <div class="absolute top-0 h-full w-full right-0 text-text-1 overflow-hidden portrait:text-white">
      <div class="zy-header-inner flex items-center justify-between h-full landscape:pr-4 portrait:pr-0 relative z-10">
        <div class="flex items-center h-full overflow-hidden">
          <Logo class="w-sidebar px-4 portrait:hidden" size="small" />
          <GoBackButton />
          <HeaderTitle />
        </div>

        <div class="h-full landscape:hidden">
          <div class="flex items-center w-full h-full justify-between">
            <div class="flex items-center h-full">
              <ZyButton class="w-header h-header" @click="openSearchDrawer()" title="搜索" type="transparent">
                <UIcon name="i-fluent-search-16-regular" class="w-5 h-5" />
              </ZyButton>
              <ZyButton class="w-header h-header" @click="openMoreDrawer()" title="更多选项" type="transparent">
                <UIcon name="i-fluent-navigation-16-regular" class="w-5 h-5" />
              </ZyButton>
            </div>
          </div>
        </div>

        <div class="portrait:hidden">
          <div class="flex justify-end h-full items-center gap-4">
            <ZyButton class="flex items-center justify-center" @click="openSearchDrawer()" title="搜索" type="icon">
              <UIcon name="i-fluent-search-16-regular" class="w-6 h-6" />
            </ZyButton>
            <ZyButton class="flex items-center justify-center" @click="toggleFullScreen" title="全屏/退出全屏" type="icon">
              <UIcon v-if="!fullScreenFlag" name="i-fluent-full-screen-maximize-16-regular" class="w-6 h-6" />
              <UIcon v-else name="i-fluent-full-screen-minimize-16-regular" class="w-6 h-6" />
            </ZyButton>
            <ZyButton class="flex items-center justify-center" @click="darkModeSwitch" title="日间/夜间" type="icon">
              <UIcon name="i-fluent-weather-sunny-16-regular" class="w-6 h-6 hidden dark:inline-block" />
              <UIcon name="i-fluent-weather-moon-16-regular" class="w-6 h-6 dark:hidden" />
            </ZyButton>
            <!-- 多语言抽屉 -->
            <ZyPopover title="切换语言" background="var(--bg-panel)">
              <template #reference>
                <ZyButton class="flex items-center justify-center" title="切换语言" type="icon">
                  <UIcon name="i-fluent-local-language-16-regular" class="w-6 h-6" />
                </ZyButton>
              </template>
              <template #actions>
                <LanguagePopoverInner />
              </template>
            </ZyPopover>
            <ZyButton class="flex items-center justify-center" @click="openMoreDrawer()" title="更多选项" type="icon">
              <UIcon name="i-fluent-navigation-16-regular" class="w-6 h-6" />
            </ZyButton>
          </div>
        </div>
      </div>
      <!-- 搜索抽屉 -->
      <ZyDrawer title="搜索" :display="searchDisplay" @cancel="closeSearchDrawer" position="top" size="100%"
        maskColor="var(--bg-mask)">
      </ZyDrawer>
      <!-- 设置抽屉 -->
      <ZyDrawer title="设置" :display="moreDisplay" @cancel="closeMoreDrawer" position="right" size="18rem"
        maskColor="var(--bg-mask)" background="var(--bg-panel)">
        <MoreDrawerInner>
          <template #footer>
            <div class="flex justify-end h-full items-center gap-4 landscape:hidden">
              <ZyButton class="flex items-center justify-center" @click="toggleFullScreen" title="全屏/退出全屏" type="icon">
                <UIcon v-if="!fullScreenFlag" name="i-fluent-full-screen-maximize-16-regular" class="w-6 h-6" />
                <UIcon v-else name="i-fluent-full-screen-minimize-16-regular" class="w-6 h-6" />
              </ZyButton>
              <ZyButton class="flex items-center justify-center" @click="darkModeSwitch" title="日间/夜间" type="icon">
                <UIcon name="i-fluent-weather-sunny-16-regular" class="w-6 h-6 hidden dark:inline-block" />
                <UIcon name="i-fluent-weather-moon-16-regular" class="w-6 h-6 dark:hidden" />
              </ZyButton>
              <ZyPopover title="切换语言" background="var(--bg-panel)" position="top-right">
                <template #reference>
                  <ZyButton class="flex items-center justify-center" title="切换语言" type="icon">
                    <UIcon name="i-fluent-local-language-16-regular" class="w-6 h-6" />
                  </ZyButton>
                </template>
                <template #actions>
                  <LanguagePopoverInner />
                </template>
              </ZyPopover>
            </div>
          </template>
        </MoreDrawerInner>
      </ZyDrawer>
    </div>
  </header>
</template>
<script setup lang="ts">
// 使用类型断言来处理 TypeScript 的类型检查
declare global {
  interface Window {
    ActiveXObject?: any;
  }
}

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

// 抽屉
const searchDisplay = ref(false);
const openSearchDrawer = () => {
  searchDisplay.value = true;
};
const closeSearchDrawer = () => {
  searchDisplay.value = false;
};
const moreDisplay = ref(false);
const openMoreDrawer = () => {
  moreDisplay.value = true;
};
const closeMoreDrawer = () => {
  moreDisplay.value = false;
};
</script>
<style>
::view-transition-new(root),
::view-transition-old(root) {
  animation: none;
}
</style>
