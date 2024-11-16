<template>
  <header>
    <div class="absolute top-0 h-full w-full landscape:bg-headBar portrait:bg-background landscape:backdrop-blur-3xl">
    </div>
    <div class="absolute top-0 h-full w-full right-0 text-text-1 overflow-hidden">
      <div class="zy-header-inner flex items-center justify-between h-full landscape:pr-4 portrait:pr-0 relative z-10">
        <div class="flex items-center h-full overflow-hidden">
          <Logo class="w-sidebar px-4 portrait:hidden" size="small" />
          <GoBackButton />
          <HeaderTitle />
        </div>

        <div class="h-full landscape:hidden">
          <div class="flex items-center w-full h-full justify-between">
            <div class="flex items-center h-full">
              <ZyButton class="w-header h-header" @click="openMoreDrawer()" title="更多选项" type="transparent">
                <ZyIcon defaultName="more" size="1.25rem" />
              </ZyButton>
            </div>
          </div>
        </div>

        <div class="portrait:hidden">
          <div class="flex justify-end h-full items-center gap-4">
            <ZyButton class="flex items-center justify-center" @click="toggleFullScreen" title="全屏/退出全屏" type="icon">
              <ZyIcon v-if="!fullScreenFlag" size="1.5rem" defaultName="maximize" />
              <ZyIcon v-else size="1.5rem" defaultName="minimize" />
            </ZyButton>
            <ZyButton class="flex items-center justify-center" @click="darkModeSwitch" title="日间/夜间" type="icon">
              <ZyIcon size="1.5rem" class="hidden dark:inline-block" defaultName="sun" />
              <ZyIcon size="1.5rem" class="dark:hidden" defaultName="moon" />
            </ZyButton>
            <!-- 多语言抽屉 -->
            <ZyPopover title="切换语言" background="var(--bg-level-1)">
              <template #reference>
                <ZyButton class="flex items-center justify-center" title="切换语言" type="icon">
                  <ZyIcon size="1.5rem" defaultName="language" />
                </ZyButton>
              </template>
              <template #actions>
                <LanguagePopoverInner />
              </template>
            </ZyPopover>
            <ZyButton class="flex items-center justify-center" @click="openMoreDrawer()" title="更多选项" type="icon">
              <ZyIcon size="1.5rem" defaultName="more" />
            </ZyButton>
          </div>
        </div>
      </div>
      <!-- 设置抽屉 -->
      <ZyDrawer title="设置" :display="moreDisplay" @cancel="closeMoreDrawer" position="right" size="18rem"
        maskColor="var(--bg-mask)" background="var(--bg-background)">
        <AdminMoreDrawerInner>
          <template #footer>
            <div class="flex justify-end h-full items-center gap-4 landscape:hidden">
              <ZyButton class="flex items-center justify-center" @click="toggleFullScreen" title="全屏/退出全屏" type="icon">
                <ZyIcon v-if="!fullScreenFlag" size="1.5rem" defaultName="maximize" />
                <ZyIcon v-else size="1.5rem" defaultName="minimize" />
              </ZyButton>
              <ZyButton class="flex items-center justify-center" @click="darkModeSwitch" title="日间/夜间" type="icon">
                <ZyIcon size="1.5rem" class="hidden dark:inline-block" defaultName="sun" />
                <ZyIcon size="1.5rem" class="dark:hidden" defaultName="moon" />
              </ZyButton>
              <ZyPopover title="切换语言" background="var(--bg-level-1)" position="top-right">
                <template #reference>
                  <ZyButton class="flex items-center justify-center" title="切换语言" type="icon">
                    <ZyIcon size="1.5rem" defaultName="language" />
                  </ZyButton>
                </template>
                <template #actions>
                  <LanguagePopoverInner />
                </template>
              </ZyPopover>
            </div>
          </template>
        </AdminMoreDrawerInner>
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
