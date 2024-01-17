<template>
  <zy-header>
    <div
      class="zy-header-inner"
      flex
      justify-between
      h-full
      w-centered
      mx-auto
      sm:px-6
      lg:px-24
      lg:py-3
      xl:px-24
    >
      <div class="vertical-layout">
        <zy-button
          h-full
          @click="openPersonalDrawer"
          title="个人资料"
          type="transparent"
        >
          <ZyIcon lineName="line-md:menu" />
        </zy-button>
      </div>

      <div h-full>
        <div flex items-center px-4 h-full>
          <img h-5 sm:h-7 src="@/src/assets/image/logo.png" alt="logo" />
          <svg
            v-if="locale == 'zh-CN'"
            fill-current
            h-3
            sm:h-5
            ml-2
            id="uuid-2320505a-bbef-4a34-b902-2705747683ee"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 403.68 126.91"
          >
            <path
              d="m42.22,45.01c0,.93,0,1.74-.12,2.67h15.89v11.6h-16.82c-.58,3.6-1.28,6.96-2.09,10.21h5.8c5.57,11.37,10.32,24.24,14.62,36.08h-12.99c-3.25-8.58-6.73-17.98-10.44-27.14-4.99,12.18-13.22,22.74-25.4,33.75l-5.34-14.85c11.83-11.25,19.14-20.76,21.81-38.05H6.73l-1.16-11.6h22.74c.12-.93.12-1.74.12-2.67l.46-17.75h-5.1c-1.51,4.76-3.36,9.51-5.45,13.92H5.22c4.99-11.02,8.82-23.55,11.14-35.38h13.11c-.7,3.25-1.51,6.5-2.32,9.86h29.58v11.6h-14.15l-.35,17.75Zm19.84,53.59V24.71c0-5.57,3.71-9.28,9.28-9.28h26.22c5.57,0,9.28,3.71,9.28,9.28v73.89c0,5.57-3.71,9.28-9.28,9.28h-26.22c-5.57,0-9.28-3.71-9.28-9.28Zm31.09-4.52V29.23c0-1.04-.7-1.74-1.74-1.74h-13.92c-1.04,0-1.74.7-1.74,1.74v64.84c0,1.04.58,1.74,1.74,1.74h13.92c1.04,0,1.74-.7,1.74-1.74Z"
            />
            <path
              d="m231.07,52.55c.58,4.41.58,4.99,0,9.28-.7,4.87-4.06,8.47-9.16,8.93-5.45.46-11.37.23-16.7-1.04l-2.55-9.63c4.06,1.16,8.12,1.51,11.95,1.28,1.51-.12,2.55-1.16,2.78-2.67.12-.46.12-2.44,0-3.02-.23-1.16-.58-1.74-1.74-1.74h-49.53c-1.16,0-1.74.58-1.74,1.74v14.27c0,1.16.58,1.74,1.74,1.74h64.15c6.26,0,8.47,3.02,9.28,9.28.58,4.41.58,13.11,0,17.98-.7,5.92-5.22,10.67-11.25,10.79-13.46.23-23.2-.7-29.12-2.32l-3.02-10.32h-54.4l-.93-10.67h76.79v10.67h-20.76c5.22,1.28,21.23,2.32,24.82,2.09,2.09-.12,3.6-1.62,3.83-3.6.23-1.97.23-9.63,0-11.25-.12-1.16-.58-1.74-1.74-1.74h-63.57c-6.26,0-9.28-3.02-9.28-9.28v-20.76c0-6.26,3.02-9.28,9.28-9.28h7.77l2.67-8.7h14.73l-2.55,8.7h27.26c-1.51-.58-2.9-1.16-4.52-1.86-6.61-3.02-12.99-7.42-19.02-12.76l-44.54,2.78-1.04-10.21,36.19-2.2c-3.6-4.18-6.96-8.58-10.09-13.22h14.5c3.02,4.52,6.61,8.58,10.56,12.3l17.05-1.04-8-9.74h12.99l7.31,8.93,19.49-1.16v10.21l-36.42,2.2c3.48,2.2,7.08,4.06,10.67,5.57,2.67,1.16,6.26,1.74,9.51,1.74,3.6,0,11.02-.58,20.18-3.02l-1.62,11.83c-4.29,1.28-9.63,2.09-14.38,2.44,1.16,1.51,1.86,3.71,2.2,6.5Zm-31.9,17.52l-28.07-4.64v-9.98l28.07,4.64v9.98Z"
            />
            <path
              d="m367.37,42.92v13.8c0,6.26-3.02,9.28-9.28,9.28h-62.29c-6.26,0-9.28-3.02-9.28-9.28v-13.8c0-2.55.58-4.64,1.62-6.15h-10.79v-13.46c0-5.57,3.71-9.28,9.28-9.28h33.52V5.8h13.92v8.24h33.75c5.57,0,9.28,3.71,9.28,9.28v13.46h-11.37c1.16,1.51,1.62,3.6,1.62,6.15Zm5.57,38.74v16.7c0,6.26-3.02,9.28-9.28,9.28h-72.85c-6.26,0-9.28-3.02-9.28-9.28v-16.7c0-6.26,3.02-9.28,9.28-9.28h72.85c6.26,0,9.28,3.02,9.28,9.28Zm-9.74-54.29c0-1.04-.7-1.74-1.74-1.74h-68.44c-1.04,0-1.74.7-1.74,1.74v6.96c1.28-.46,2.78-.7,4.52-.7h62.29c2.09,0,3.71.35,5.1.93v-7.19Zm-67.74,58.35v8.7c0,1.16.58,1.74,1.74,1.74h60.09c1.16,0,1.74-.58,1.74-1.74v-8.7c0-1.16-.58-1.74-1.74-1.74h-60.09c-1.16,0-1.74.58-1.74,1.74Zm4.99-39.21v6.61c0,1.04.58,1.74,1.74,1.74h49.53c1.16,0,1.74-.7,1.74-1.74v-6.61c0-1.16-.58-1.74-1.74-1.74h-49.53c-1.16,0-1.74.58-1.74,1.74Z"
            />
          </svg>
          <svg
            v-if="locale == 'en'"
            fill-current
            h="[30%]"
            ml-2
            id="uuid-1031c088-f5b4-41cd-bcb8-0f0b44c971cf"
            data-name="图层 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 375.88 52.19"
          >
            <path
              d="m9.92,35.68h15.56v5.34H1.91v-4.53l15.75-24.53H3.05v-5.3h22.47v4.34l-15.6,24.67Z"
            />
            <path
              d="m52.29,41.03v-14.41h-14.74v14.41h-6.06V6.67h6.06v14.03h14.74V6.67h6.11v34.35h-6.11Z"
            />
            <path d="m66.5,41.03V6.67h6.06v34.35h-6.06Z" />
            <path
              d="m93.84,27.05v13.98h-6.54v-13.84l-10.5-20.52h6.92l6.97,14.46,7.11-14.46h6.63l-10.59,20.37Z"
            />
            <path
              d="m133.3,29.29c0,8.16-4.44,12.31-12.6,12.31s-12.6-4.15-12.6-12.36V6.67h6.06v22.62c0,4.68,2,6.58,6.54,6.58s6.54-1.91,6.54-6.58V6.67h6.06v22.62Z"
            />
            <path
              d="m161.06,41.03l-2.53-8.11h-12.5l-2.48,8.11h-6.49l11.83-34.35h7.06l11.59,34.35h-6.49Zm-8.73-28.53l-4.72,15.13h9.4l-4.68-15.13Z"
            />
            <path
              d="m192.41,41.03l-14.46-24.05v24.05h-6.06V6.67h6.25l14.08,23.33-.05-23.33h6.06v34.35h-5.82Z"
            />
            <path
              d="m212.39,28.62v12.41h-6.06V6.67h12.07c8.11,0,12.17,4.1,12.17,10.88,0,7.4-4.29,11.07-12.45,11.07h-5.73Zm0-16.46v11.02h5.77c4.29,0,6.06-1.67,6.06-5.53s-1.91-5.49-6.06-5.49h-5.77Z"
            />
            <path
              d="m256.29,41.03l-2.53-8.11h-12.5l-2.48,8.11h-6.49l11.83-34.35h7.06l11.59,34.35h-6.49Zm-8.73-28.53l-4.72,15.13h9.4l-4.68-15.13Z"
            />
            <path d="m267.11,41.03V6.67h6.06v28.58h14.98v5.77h-21.04Z" />
            <path
              d="m313.63,41.03l-2.53-8.11h-12.5l-2.48,8.11h-6.49l11.83-34.35h7.06l11.59,34.35h-6.49Zm-8.73-28.53l-4.72,15.13h9.4l-4.68-15.13Z"
            />
            <path
              d="m346.6,37.16c-2.48,3.05-6.01,4.44-10.45,4.44-6.87,0-12.02-4.15-12.6-10.5-.38-4.1-.33-9.26-.14-13.17.33-7.59,5.3-11.83,12.74-11.83,4.29,0,7.3,1.24,10.02,4.01l-3.63,4.77c-1.53-2.29-3.77-3.1-6.39-3.1-3.77.14-6.11,1.81-6.39,6.73-.14,2.72-.24,8.16.14,11.69.48,4.48,3.01,5.68,6.25,5.68,2.72-.1,4.72-.72,6.78-3.29l3.67,4.58Z"
            />
            <path
              d="m352.17,41.03V6.67h20.95v5.68h-14.89v8.59h13.65v5.58h-13.65v8.78h15.27v5.73h-21.33Z"
            />
          </svg>
        </div>
      </div>

      <div class="vertical-layout">
        <zy-button
          h-full
          @click="openSearchDrawer"
          title="搜索"
          type="transparent"
        >
          <ZyIcon lineName="line-md:search-twotone" />
        </zy-button>
      </div>
      <div class="horizontal-layout">
        <div flex justify-end h-full items-center gap-2>
          <Navigation class="horizontal-layout" h-full mr-8 xl:mr-12 />
          <zy-button
            flex
            items-center
            justify-center
            @click="openSearchDrawer()"
            title="搜索"
          >
            <ZyIcon size="0.75rem" lineName="line-md:search-twotone" />
          </zy-button>
          <zy-button
            flex
            items-center
            justify-center
            @click="toggleFullScreen"
            title="全屏/退出全屏"
          >
            <ZyIcon
              v-if="!fullScreenFlag"
              size="0.75rem"
              lineName="line-md:arrows-diagonal"
            />
            <ZyIcon
              v-else
              size="0.75rem"
              lineName="mingcute:fullscreen-exit-2-line"
            />
          </zy-button>
          <zy-button
            flex
            items-center
            justify-center
            @click="darkModeSwitch"
            title="日间/夜间"
          >
            <ZyIcon
              v-if="darkModeFlag == false"
              size="0.75rem"
              lineName="line-md:sunny-outline-twotone-loop"
            />
            <ZyIcon
              v-else-if="darkModeFlag == true"
              size="0.75rem"
              lineName="line-md:moon-twotone-loop"
            />
          </zy-button>
          <!-- 多语言抽屉 -->
          <ClientOnly>
            <zy-popover title="切换语言" background="var(--bg-5)">
              <template #reference>
                <zy-button flex items-center justify-center title="切换语言">
                  <ZyIcon size="0.75rem" lineName="clarity:language-solid" />
                </zy-button>
              </template>
              <template #actions>
                <div p-2 color="text-1">
                  <ul>
                    <li
                      v-for="lang in (availableLocales as any)"
                      :key="lang.code"
                      :to="switchLocalePath(lang.code)"
                      @click="switchLanguage(lang.code)"
                    >
                      <label inline-block w-full h-full flex justify-between>
                        <span>{{ lang.name }}</span>
                        <input
                          type="radio"
                          name="lang"
                          :checked="lang.code == locale"
                        />
                      </label>
                    </li>
                  </ul>
                </div>
              </template>
            </zy-popover>
          </ClientOnly>

          <zy-button
            flex
            items-center
            justify-center
            @click="openMoreDrawer()"
            title="更多选项"
          >
            <ZyIcon lineName="line-md:grid-3-filled" />
          </zy-button>
        </div>
      </div>
    </div>
    <!-- 搜索抽屉 -->
    <ClientOnly>
      <zy-drawer
        title="搜索"
        :display="searchDisplay"
        @cancel="closeSearchDrawer"
        position="top"
        size="100%"
      >
      </zy-drawer>
    </ClientOnly>
    <!-- 更多选项抽屉 -->
    <ClientOnly>
      <zy-drawer
        title="更多选项"
        :display="moreDisplay"
        @cancel="closeMoreDrawer"
        position="right"
        size="20rem"
        background="var(--bg-5)"
      >
      </zy-drawer>
    </ClientOnly>
    <!-- 个人资料抽屉 -->
    <ClientOnly>
      <zy-drawer
        title="个人资料"
        :display="personalDisplay"
        @cancel="closePersonalDrawer"
        position="left"
        size="100%"
        background="var(--bg-5)"
      >
      </zy-drawer>
    </ClientOnly>
  </zy-header>
</template>
<script setup lang="ts">
import Navigation from "./Navigation/Navigation.vue";

// 多语言
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value;
});

const switchLanguage = (code: any) => {
  const router = useRouter();
  const to = switchLocalePath(code);
  router.replace({ path: to });
};

// 夜间模式
const darkModeFlag = ref<null | boolean>(null);
const darkModeInit = () => {
  if (process.client) {
    const isDarkmode = (window as any).isDarkmode;
    if (isDarkmode) {
      darkModeFlag.value = true;
    } else {
      darkModeFlag.value = false;
    }
  }
};
onMounted(() => {
  darkModeInit();
});
const darkModeSwitch = () => {
  if (!document.documentElement.classList.contains("dark")) {
    darkModeFlag.value = true;
    document.documentElement.classList.add("dark");
  } else {
    darkModeFlag.value = false;
    document.documentElement.classList.remove("dark");
  }
};

// 全屏
const fullScreen = () => {
  const element = document.documentElement as any; //若要全屏页面div
  //IE 10及以下ActiveXObject
  if (window.ActiveXObject) {
    const WsShell = new ActiveXObject("WScript.Shell");
    WsShell.SendKeys("{F11}");
    //写全屏后的执行函数
  }
  //HTML W3C 提议
  else if (element.requestFullScreen) {
    element.requestFullScreen();
    //写全屏后的执行函数
  }
  //IE11
  else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
    //写全屏后的执行函数
  }
  // Webkit (works in Safari5.1 and Chrome 15)
  else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
    //写全屏后的执行函数
  }
  // Firefox (works in nightly)
  else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
    //写全屏后的执行函数
  } else {
    alert("此设备不支持 Fullscreen API");
  }
};

// 退出全屏
const fullExit = () => {
  const element = document.documentElement as any; //若要全屏页面中
  const doc = document as any;
  //IE ActiveXObject
  if (window.ActiveXObject) {
    const WsShell = new ActiveXObject("WScript.Shell");
    WsShell.SendKeys("{F11}");
    //写退出全屏后的执行函数
  }
  //HTML5 W3C 提议
  else if (element.requestFullScreen) {
    doc.exitFullscreen();
    //写退出全屏后的执行函数
  }
  //IE 11
  else if (element.msRequestFullscreen) {
    doc.msExitFullscreen();
    //写退出全屏后的执行函数
  }
  // Webkit (works in Safari5.1 and Chrome 15)
  else if (element.webkitRequestFullScreen) {
    doc.webkitCancelFullScreen();
    //写退出全屏后的执行函数
  }
  // Firefox (works in nightly)
  else if (element.mozRequestFullScreen) {
    doc.mozCancelFullScreen();
    //写退出全屏后的执行函数
  }
};

// 切换
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
const personalDisplay = ref(false);
const openPersonalDrawer = () => {
  personalDisplay.value = true;
};
const closePersonalDrawer = () => {
  personalDisplay.value = false;
};
</script>
<style lang="scss" scoped>
@media (orientation: portrait) {
  /* 竖屏 */
  .zy-header-inner {
    background-color: var(--bg-2);
  }
}
@media (orientation: landscape) {
  /* 横屏 */
  .zy-header-inner {
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: var(--bg-1);
  }
}
</style>
