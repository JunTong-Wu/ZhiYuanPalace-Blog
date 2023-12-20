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
          id="uuid-87899156-8a45-4883-bf85-208796aa52bc"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 381.03 138.95"
        >
          <path
            d="m46.23,49.28c0,1.02,0,1.91-.13,2.92h17.4v12.7h-18.42c-.63,3.94-1.4,7.62-2.29,11.18h6.35c6.1,12.45,11.3,26.55,16,39.5h-14.23c-3.56-9.4-7.37-19.69-11.43-29.72-5.46,13.34-14.48,24.89-27.82,36.96l-5.84-16.26c12.96-12.32,20.96-22.74,23.88-41.66H7.37l-1.27-12.7h24.89c.13-1.02.13-1.91.13-2.92l.51-19.43h-5.59c-1.65,5.21-3.68,10.42-5.97,15.24H5.72c5.46-12.07,9.65-25.78,12.19-38.74h14.35c-.76,3.56-1.65,7.11-2.54,10.8h32.39v12.7h-15.5l-.38,19.43Zm21.72,58.68V27.05c0-6.1,4.06-10.16,10.16-10.16h28.71c6.1,0,10.16,4.06,10.16,10.16v80.91c0,6.1-4.06,10.16-10.16,10.16h-28.71c-6.1,0-10.16-4.06-10.16-10.16Zm34.04-4.95V32c0-1.14-.76-1.91-1.91-1.91h-15.24c-1.14,0-1.91.76-1.91,1.91v71c0,1.14.63,1.91,1.91,1.91h15.24c1.14,0,1.91-.76,1.91-1.91Z"
            opacity=".99"
          />
          <path
            d="m232.69,57.53c.63,4.83.63,5.46,0,10.16-.76,5.33-4.45,9.27-10.03,9.78-5.97.51-12.45.25-18.29-1.14l-2.79-10.54c4.45,1.27,8.89,1.65,13.08,1.4,1.65-.13,2.79-1.27,3.05-2.92.13-.51.13-2.67,0-3.3-.25-1.27-.64-1.91-1.91-1.91h-54.24c-1.27,0-1.91.63-1.91,1.91v15.62c0,1.27.64,1.9,1.91,1.9h70.24c6.86,0,9.27,3.3,10.16,10.16.63,4.83.63,14.35,0,19.69-.76,6.48-5.72,11.69-12.32,11.81-14.73.25-25.4-.76-31.88-2.54l-3.3-11.3h-59.57l-1.02-11.69h84.08v11.69h-22.74c5.71,1.4,23.24,2.54,27.18,2.29,2.29-.13,3.94-1.78,4.19-3.94s.25-10.54,0-12.32c-.13-1.27-.63-1.91-1.91-1.91h-69.6c-6.86,0-10.16-3.3-10.16-10.16v-22.74c0-6.86,3.3-10.16,10.16-10.16h8.51l2.92-9.53h16.13l-2.79,9.53h29.85c-1.65-.63-3.18-1.27-4.95-2.03-7.24-3.3-14.23-8.13-20.83-13.97l-48.77,3.05-1.14-11.18,39.63-2.41c-3.94-4.57-7.62-9.4-11.05-14.48h15.88c3.3,4.95,7.24,9.4,11.56,13.46l18.67-1.14-8.76-10.67h14.23l8,9.78,21.34-1.27v11.18l-39.88,2.41c3.81,2.41,7.75,4.45,11.68,6.1,2.92,1.27,6.86,1.91,10.42,1.91,3.94,0,12.07-.63,22.1-3.3l-1.78,12.96c-4.7,1.4-10.54,2.29-15.75,2.67,1.27,1.65,2.03,4.06,2.41,7.11Zm-34.93,19.18l-30.74-5.08v-10.92l30.74,5.08v10.92Z"
            opacity=".99"
          />
          <path
            d="m361.6,46.99v15.11c0,6.86-3.3,10.16-10.16,10.16h-68.21c-6.86,0-10.16-3.3-10.16-10.16v-15.11c0-2.79.64-5.08,1.78-6.73h-11.81v-14.73c0-6.1,4.06-10.16,10.16-10.16h36.71V6.35h15.24v9.02h36.96c6.1,0,10.16,4.06,10.16,10.16v14.73h-12.45c1.27,1.65,1.78,3.94,1.78,6.73Zm6.1,42.42v18.29c0,6.86-3.3,10.16-10.16,10.16h-79.76c-6.86,0-10.16-3.3-10.16-10.16v-18.29c0-6.86,3.3-10.16,10.16-10.16h79.76c6.86,0,10.16,3.3,10.16,10.16Zm-10.67-59.44c0-1.14-.76-1.91-1.91-1.91h-74.94c-1.14,0-1.91.76-1.91,1.91v7.62c1.4-.51,3.05-.76,4.95-.76h68.21c2.29,0,4.06.38,5.59,1.02v-7.88Zm-74.18,63.89v9.53c0,1.27.64,1.91,1.91,1.91h65.79c1.27,0,1.91-.64,1.91-1.91v-9.53c0-1.27-.63-1.91-1.91-1.91h-65.79c-1.27,0-1.91.63-1.91,1.91Zm5.46-42.93v7.24c0,1.14.63,1.91,1.91,1.91h54.24c1.27,0,1.9-.76,1.9-1.91v-7.24c0-1.27-.63-1.91-1.9-1.91h-54.24c-1.27,0-1.91.64-1.91,1.91Z"
            opacity=".99"
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
          @click="openDrawer()"
        >
          <ZyIcon
            size="1.2rem"
            lineName="line-md:grid-3-filled"
            lineColor="var(--text-2)"
          />
        </zy-button>
      </div>
    </div>
    <!-- 抽屉面板 -->
    <ClientOnly>
      <zy-slide-drawer
        title="更多选项"
        :display="display"
        @cancel="closeDrawer"
        position="right"
        size="20rem"
        teleport="body"
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
const display = ref(false);
const openDrawer = () => {
  display.value = true;
};
const closeDrawer = () => {
  display.value = false;
};
</script>
