<template>
  <header class="select-none">
    <!-- PC端顶栏遮蔽 -->
    <div class="portrait:hidden h-status w-full bg-level-b1">
      <div class="h-status reverse-rounded"></div>
    </div>
    <div class="absolute z-10 top-0 left-0 h-status w-full bg-level-b1"></div>

    <!-- StatusBar -->
    <div class="portrait:hidden absolute z-10 top-0 left-0 h-status w-full flex items-center">
      <!-- 图标区 -->
      <Logo class="w-sidebar px-4 portrait:hidden cursor-pointer" size="small" @click="backToHome" />

      <!-- 歌词区 -->
      <ZyButton class="flex items-center justify-center p-1 h-[70%] w-72" title="歌词" type="text">
        <span class="text-xs text-text-2 w-72 px-4 text-start">暂无歌词，享受好音乐</span>
      </ZyButton>

      <!-- 时钟区 -->
      <ClientOnly>
        <div class="layout-clock absolute left-[50%] -translate-x-[50%] h-full">
          <div
            class="bg-background w-72 flex flex-col items-center px-4 rounded-full h-[70%] relative top-[15%] justify-center">
            <span class="time text-sm text-text-1">{{ time }}</span>
            <div class="date text-xs text-text-3">{{ todayDate }}</div>
          </div>
        </div>
      </ClientOnly>

      <div class="absolute right-2 top-0 h-full flex items-center">
        <!-- 日期区 -->

        <!-- 按键区 -->

        <div v-if="isAdminHeader" class="p-2 -ml-2 h-status w-status">
          <ZyButton class="flex items-center justify-center w-full h-full" @click="backToHome" title="回到前台" type="icon">
            <UIcon name="i-fluent-home-16-regular" class="w-6 h-6" />
          </ZyButton>
        </div>

        <div class="flex justify-end h-full items-center">
          <!-- 多语言抽屉 -->
          <div class="p-2 -ml-2 h-status w-status">
            <ZyPopover title="切换语言" background="var(--bg-level-1)" class="w-full h-full">
              <template #reference>
                <ZyButton class="flex items-center justify-center w-full h-full" title="切换语言" type="icon">
                  <UIcon name="i-fluent-local-language-16-regular" class="w-6 h-6" />
                </ZyButton>
              </template>
              <template #actions>
                <LanguagePopoverInner />
              </template>
            </ZyPopover>
          </div>


          <div v-if="!isAdminHeader" class="p-2 -ml-2 h-status w-status">
            <ZyButton class="flex items-center justify-center w-full h-full" @click="openSearchDrawer()" title="搜索"
              type="icon">
              <UIcon name="i-fluent-search-16-regular" class="w-6 h-6" />
            </ZyButton>
          </div>

          <div class="p-2 -ml-2 h-status w-status">
            <ZyButton class="flex items-center justify-center w-full h-full" @click="toggleFullScreen" title="全屏/退出全屏"
              type="icon">
              <UIcon v-if="!fullScreenFlag" name="i-fluent-full-screen-maximize-16-regular" class="w-6 h-6" />
              <UIcon v-else name="i-fluent-full-screen-minimize-16-regular" class="w-6 h-6" />
            </ZyButton>
          </div>

          <div class="p-2 -ml-2 h-status w-status">
            <ZyButton class="flex items-center justify-center w-full h-full" @click="darkModeSwitch" title="日间/夜间"
              type="icon">
              <UIcon name="i-fluent-weather-sunny-16-regular" class="w-6 h-6 hidden dark:inline-block" />
              <UIcon name="i-fluent-weather-moon-16-regular" class="w-6 h-6 dark:hidden" />
            </ZyButton>
          </div>

          <div v-if="!isAdminHeader" class="p-2 -ml-2 h-status w-status">
            <ZyButton class="flex items-center justify-center w-full h-full" @click="openMoreDrawer()" title="更多选项"
              type="icon">
              <UIcon name="i-fluent-more-vertical-28-regular" class="w-6 h-6" />
            </ZyButton>
          </div>

        </div>
      </div>
    </div>

    <!-- 主体 -->
    <div class=" h-full text-text-1 portrait:text-white bg-headBar backdrop-blur-3xl">
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
        <div class="h-header relative">
          <div class="h-full w-auto flex items-center justify-between">
            <div class="flex gap-2 items-center h-full">
              <GoBackButton />
              <HeaderTitle :isAdminHeader="isAdminHeader" />
              <ClientOnly>
                <PostTitle />
              </ClientOnly>
            </div>
            <!-- 按键区 -->
            <div class="h-full landscape:hidden">
              <div class="flex items-center w-full h-full justify-between">
                <div class="flex items-center h-full">
                  <ZyButton v-if="!isAdminHeader" class="w-header h-header" @click="openSearchDrawer()" title="搜索"
                    type="transparent">
                    <UIcon name="i-fluent-search-16-regular" class="w-5 h-5" />
                  </ZyButton>
                  <ZyButton v-if="!isAdminHeader" class="w-header h-header" @click="openMoreDrawer()" title="更多选项"
                    type="transparent">
                    <UIcon name="i-fluent-more-vertical-28-regular" class="w-5 h-5" />
                  </ZyButton>
                  <ZyButton v-if="isAdminHeader" class="w-header h-header" @click="openAdminNavigationDrawer()" title="菜单"
                    type="transparent">
                    <UIcon name="i-fluent-navigation-16-filled" class="w-5 h-5" />
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
        <MoreDrawerInner @closeDrawer="closeMoreDrawer">
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
      <!-- 管理员移动端导航抽屉 -->
      <ZyDrawer title="设置" :display="adminNavigationDisplay" @cancel="closeAdminNavigationDrawer" position="right"
        size="var(--drawer-width)" maskColor="var(--bg-mask)" :maskBlur="true">
        <AdminNavigationDrawerInner @closeDrawer="closeAdminNavigationDrawer">
          <template #footer>
            <div class="flex justify-end h-full items-center gap-4 landscape:hidden">
              <ZyButton v-if="isAdminHeader" class="flex items-center justify-center" @click="backToHome" title="回到前台"
                type="icon">
                <UIcon name="i-fluent-home-16-regular" class="w-6 h-6" />
              </ZyButton>
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
        </AdminNavigationDrawerInner>
      </ZyDrawer>
    </div>
  </header>
</template>
<script setup lang="ts">
import "./transition.scss"

const props = defineProps({
  isAdminHeader: {
    type: Boolean,
    default: false,
  },
});

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

const adminNavigationDisplay = ref(false);
const openAdminNavigationDrawer = () => {
  adminNavigationDisplay.value = true;
};
const closeAdminNavigationDrawer = () => {
  adminNavigationDisplay.value = false;
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

const router = useRouter();
// 管理员回到前台
const backToHome = () => {
  router.replace('/')
};
</script>
<style>
::view-transition-new(root),
::view-transition-old(root) {
  animation: none;
}
</style>
<style lang="scss" scoped>
.reverse-rounded {
  --background: var(--bg-level-b1);
  position: relative;
  z-index: 10;

  &::after {
    position: absolute;
    content: "";
    width: 2rem;
    height: 2rem;
    line-height: 100px;
    bottom: -2rem;
    background-image: radial-gradient(2rem at 2rem 2rem, transparent 2rem, var(--background) 2rem);
  }

  &::before {
    position: absolute;
    content: "";
    width: 2rem;
    height: 2rem;
    line-height: 100px;
    bottom: -2rem;
    right: 0;
    background-image: radial-gradient(2rem at 0rem 2rem, transparent 2rem, var(--background) 2rem);
  }
}

.layout-clock {
  .date {
    max-height: 0rem;
    overflow: hidden;
    opacity: 0;
    transition: max-height 0.2s ease-in-out, opacity 0.1s ease-in-out;
  }

  &:hover {
    .date {
      opacity: 1;
      max-height: 1rem;
    }
  }
}
</style>
