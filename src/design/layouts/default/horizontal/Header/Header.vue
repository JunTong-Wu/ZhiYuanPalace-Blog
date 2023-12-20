<template>
  <zy-header>
    <div flex justify-between h-full backdrop-blur-xl max-w-7xl mx-auto>
      <div flex items-center justify-center px-4 w-sidebar v-zy-ripple>
        <img h-5 md:h-8 src="@/src/assets/image/logo.png" alt="logo" />
        <svg
          w-12
          md:w-16
          fill-current
          h-4
          md:h-8
          ml-2
          xmlns="http://www.w3.org/2000/svg"
          id="uuid-a4d9451e-5c74-4a7b-8029-1c6b2343bf0b"
          viewBox="0 0 381.03 128"
        >
          <path
            d="m37.71,1.49h12.9c-.33,1.98-.67,3.97-.99,5.95-.67,4.96-1.33,8.6-1.98,10.92h22.82v4.96h-14.88v29.77h15.88v4.96h-15.88v12.9c.66,14.88,5.62,23.49,14.88,25.8-2.98,3.31-3.81,8.27-2.48,14.88.33.66,0,.82-.99.5-6.29-3.3-10.09-12.07-11.41-26.29-1.66,15.22-9.6,27.95-23.81,38.2h-3.97c11.91-9.92,17.86-26.95,17.86-51.1v-14.88h-17.86v-4.96h17.86v-29.77c-2.32,8.27-6.62,15.55-12.9,21.83h-3.97c6.61-8.26,9.59-22.82,8.93-43.66Zm46.64,102.2v14.39h-9.92V14.39h9.92v3.97h13.89v-3.97h9.92v102.7h-9.92v-13.4h-13.89Zm0-80.37v75.41h13.89V23.32h-13.89Z"
            opacity=".99"
          />
          <path
            d="m148.84,30.26l-.99-5.95,35.72-2.98c-2.65-4.96-4.47-11.24-5.46-18.85h10.42c1.32,7.61,3.3,13.57,5.95,17.86l15.38-.99c-3.64-4.96-6.29-9.59-7.94-13.89l.5-.5c2.98,1.33,6.28,3.15,9.92,5.46,1.32.33,2.31.67,2.98.99-.67,1.66-1.33,3.31-1.98,4.96-.33.99-.5,1.82-.5,2.48l17.36-1.49v5.95l-32.25,2.98c7.27,10.26,16.7,17.04,28.28,20.34l1.98-17.36h.99v14.88c0,1.98.99,2.98,2.98,2.98v11.91c-6.29-.99-11.91-2.64-16.87-4.96v12.9c-.33,7.61-5.46,12.57-15.38,14.88-.67-.66-1.49-.99-2.48-.99l-7.44.5-.5-1.49c10.58-1.32,15.88-5.29,15.88-11.91v-9.92h-35.72v27.78h43.66v-3.97h9.92v29.27c-.33,8.26-6.45,13.22-18.36,14.88-.33-.99-1.49-1.33-3.47-.99h-7.44l-.5-.99c13.56-1.33,20.17-5.29,19.84-11.91v-21.33h-43.66v4.96h-9.92v-46.64h9.92v3.97h7.94c1.32-1.98,1.98-4.29,1.98-6.95v-4.96h11.91c-.67,5.95-3.97,9.92-9.92,11.91h23.81v-2.98h2.98c-8.93-5.29-16.37-12.9-22.33-22.82l-37.21,2.98Zm59.54,72.93v4.96h-60.53v-4.96h60.53Zm-28.28-40.68l.5-.5c6.61,3.31,10.58,5.29,11.91,5.95-.33,2.32-.99,4.96-1.99,7.94-.67.99-1.33.99-1.98,0-3.31-3.64-6.12-8.1-8.43-13.4Z"
            opacity=".99"
          />
          <path
            d="m289.74,13.4v4.96h29.77c-2.65-4.29-4.8-9.59-6.45-15.88l.5-.5c5.95,2.98,10.42,5.95,13.4,8.93-.99,2.98-2.48,5.46-4.46,7.44h26.79v-5.95h9.92v18.85c-4.3-1.65-7.61,0-9.92,4.96v-12.9h-59.54v11.91h-9.92V13.4h9.92Zm-1.98,110.64v-48.12h9.92v4.96h44.65v-4.96h9.92v48.12h-9.92v-8.93h-44.65v8.93h-9.92Zm7.94-54.08V31.26h9.92v4.96h27.78v-3.97h9.92v37.71h-9.92v-4.96h-27.78v4.96h-9.92Zm1.98,15.88v24.31h44.65v-24.31h-44.65Zm7.94-25.8h27.78v-18.85h-27.78v18.85Z"
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
            lineName="line-md:moon-twotone-loop"
            lineColor="var(--text-2)"
          />
          <ZyIcon
            v-else
            size="1.2rem"
            lineName="line-md:sunny-outline-twotone-loop"
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
