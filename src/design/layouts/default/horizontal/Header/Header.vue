<template>
  <zy-header>
    <div flex justify-between h-full backdrop-blur-xl max-w-7xl mx-auto>
      <div flex items-center px-4 w-sidebar v-zy-ripple>
        <img h-5 md:h-8 src="@/src/assets/image/logo.png" alt="logo" />
        <svg
          w-12
          md:w-16
          fill-current
          h-4
          md:h-8
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
      </div>
      <Navigation />
      <div flex justify-end h-full w-sidebar>
        <zy-button w="[25%]" h-full flex items-center justify-center>
          <ZyIcon
            size="1.2rem"
            lineName="line-md:search-twotone"
            lineColor="var(--text-1)"
            @click="openSearchDrawer()"
          />
        </zy-button>
        <zy-button
          w="[25%]"
          h-full
          flex
          items-center
          justify-center
          @click="toggleFullScreen"
        >
          <ZyIcon
            v-if="!fullScreenFlag"
            size="1.2rem"
            lineName="line-md:arrows-diagonal"
            lineColor="var(--text-2)"
          />
          <ZyIcon
            v-else
            size="1.2rem"
            lineName="mingcute:fullscreen-exit-2-line"
            lineColor="var(--text-2)"
          />
        </zy-button>
        <zy-button
          w="[25%]"
          h-full
          flex
          items-center
          justify-center
          @click="darkModeSwitch"
        >
          <ZyIcon
            v-if="!darkModeFlag"
            size="1.2rem"
            lineName="line-md:sunny-outline-twotone-loop"
            lineColor="var(--text-2)"
          />
          <ZyIcon
            v-else
            size="1.2rem"
            lineName="line-md:moon-twotone-loop"
            lineColor="var(--text-2)"
          />
        </zy-button>
        <zy-button
          w="[25%]"
          h-full
          flex
          items-center
          justify-center
          @click="openMoreDrawer()"
        >
          <ZyIcon
            size="1.2rem"
            lineName="line-md:grid-3-filled"
            lineColor="var(--text-2)"
          />
        </zy-button>
      </div>
    </div>
    <!-- 搜索抽屉 -->
    <ClientOnly>
      <zy-slide-drawer
        title="搜索"
        :display="searchDisplay"
        @cancel="closeSearchDrawer"
        position="top"
        size="20rem"
      >
      </zy-slide-drawer>
    </ClientOnly>
    <!-- 更多选项抽屉 -->
    <ClientOnly>
      <zy-slide-drawer
        title="更多选项"
        :display="moreDisplay"
        @cancel="closeMoreDrawer"
        position="right"
        size="10rem"
      >
      </zy-slide-drawer>
    </ClientOnly>
  </zy-header>
</template>
<script setup lang="ts">
import Navigation from "./Navigation/Navigation.vue";
// 夜间模式
const darkModeFlag = ref(false);
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

// 抽屉
const moreDisplay = ref(false);
const openMoreDrawer = () => {
  moreDisplay.value = true;
};
const closeMoreDrawer = () => {
  moreDisplay.value = false;
};
</script>
