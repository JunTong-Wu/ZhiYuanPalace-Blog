<template>
  <header>
    <!-- StatusBar -->
    <div class="portrait:hidden h-status relative w-full flex items-center">
      <!-- 遮罩 -->
      <div class="absolute top-0 h-full w-full bg-[rgba(0,0,0,0.05)] mix-blend-multiply"></div>
      <Logo class="w-sidebar px-4 portrait:hidden" size="small" />
      <!-- 歌词区 -->
      <div class="bg-[rgba(127,127,127,0.2)]  w-96 flex items-center px-4 rounded-full h-[70%]">
        <span class="text-xs text-text-1">暂无歌词，享受好音乐</span>
      </div>
      <!-- 时间区 -->
      <div class="absolute left-[50%] -translate-x-[50%] text-text-2">
        <ZyButton class="flex items-center justify-center p-1 px-2" title="时钟" type="icon">
          {{ time }}
        </ZyButton>
      </div>
      <div class="absolute right-0 top-0 h-full flex items-center">
        <!-- 日期区 -->
        <div class="flex items-center justify-end h-full text-text-2 p-2">
          {{ todayDate }}
        </div>
        <!-- 按键区 -->
        <div class="flex justify-end h-full items-center gap-1">
          <!-- 多语言抽屉 -->
          <ZyPopover title="切换语言" background="var(--bg-level-1)">
            <template #reference>
              <ZyButton class="flex items-center justify-center p-1 w-8" title="切换语言" type="icon">
                <UIcon name="i-fluent-local-language-16-regular" class="w-5 h-5" />
              </ZyButton>
            </template>
            <template #actions>
              <LanguagePopoverInner />
            </template>
          </ZyPopover>
          <ZyButton class="flex items-center justify-center p-1 w-8" @click="openSearchDrawer()" title="搜索" type="icon">
            <UIcon name="i-fluent-search-16-regular" class="w-5 h-5" />
          </ZyButton>
          <ZyButton class="flex items-center justify-center p-1 w-8" @click="toggleFullScreen" title="全屏/退出全屏"
            type="icon">
            <UIcon v-if="!fullScreenFlag" name="i-fluent-full-screen-maximize-16-regular" class="w-5 h-5" />
            <UIcon v-else name="i-fluent-full-screen-minimize-16-regular" class="w-5 h-5" />
          </ZyButton>
          <ZyButton class="flex items-center justify-center p-1 w-8" @click="darkModeSwitch" title="日间/夜间" type="icon">
            <UIcon name="i-fluent-weather-sunny-16-regular" class="w-5 h-5 hidden dark:inline-block" />
            <UIcon name="i-fluent-weather-moon-16-regular" class="w-5 h-5 dark:hidden" />
          </ZyButton>

          <ZyButton class="flex items-center justify-center p-1 w-8" @click="openMoreDrawer()" title="更多选项" type="icon">
            <UIcon name="i-fluent-more-vertical-28-regular" class="w-5 h-5" />
          </ZyButton>
        </div>
      </div>
    </div>


    <!-- 主体 -->
    <div class=" h-full w-full text-text-1 portrait:text-white">
      <!-- 背景 -->
      <div class="landscape:hidden">
        <div class="absolute top-0 h-header w-full portrait:bg-theme-500 portrait:dark:brightness-[.5] ">
        </div>
        <div
          class=" absolute top-0 h-full w-full bg-gradient-to-r from-theme-500 to-transparent pointer-events-none dark:brightness-50 mix-blend-multiply">
        </div>
      </div>
      <!-- 主体内容 -->
      <div class="zy-header-inner h-full relative z-10">
        <div class="h-header relative landscape:w-full landscape:pl-sidebar landscape:pr-toolbar">
          <div class="h-full w-auto flex items-center justify-between">
            <div class="flex items-center h-full">
              <GoBackButton />
              <HeaderTitle />
            </div>
            <!-- 按键区 -->
            <div class="h-full landscape:hidden">
              <div class="flex items-center w-full h-full justify-between">
                <div class="flex items-center h-full">
                  <ZyButton class="w-header h-header" @click="openSearchDrawer()" title="搜索" type="transparent">
                    <UIcon name="i-fluent-search-16-regular" class="w-5 h-5" />
                  </ZyButton>
                  <ZyButton class="w-header h-header" @click="openMoreDrawer()" title="更多选项" type="transparent">
                    <UIcon name="i-fluent-more-vertical-28-regular" class="w-5 h-5" />
                  </ZyButton>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      <!-- 搜索抽屉 -->
      <ZyDrawer title="搜索" :display="searchDisplay" @cancel="closeSearchDrawer" position="top" size="100%"
        maskColor="var(--bg-mask)" :maskBlur="true">
      </ZyDrawer>
      <!-- 设置抽屉 -->
      <ZyDrawer title="设置" :display="moreDisplay" @cancel="closeMoreDrawer" position="right" size="var(--drawer-width)"
        maskColor="rgba(0,0,0,0.4)" background="var(--bg-level-1)">
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
              <ZyPopover title="切换语言" background="var(--bg-level-1)" position="top-right">
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

// 时钟
const time = ref("");
const updateTime = () => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  time.value = `${hours}:${minutes}:${seconds}`;
};
// 初始化时间
updateTime();
// 每秒钟更新一次时间
let timeInterval: NodeJS.Timeout; // 定义一个变量来存储定时器的返回值
onMounted(() => {
  timeInterval = setInterval(updateTime, 1); // 将定时器的返回值存储在 timeInterval 变量中
});
onBeforeUnmount(() => {
  clearInterval(timeInterval); // 在组件卸载前清除定时器
});

//日期
const todayDate = ref("");
const updateDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const week = date.getDay();
  const weekStr = ["日", "一", "二", "三", "四", "五", "六"];
  todayDate.value = `${year}-${month}-${day} 星期${weekStr[week]}`;
};
// 初始化时间
updateDate();
</script>
<style>
::view-transition-new(root),
::view-transition-old(root) {
  animation: none;
}
</style>
