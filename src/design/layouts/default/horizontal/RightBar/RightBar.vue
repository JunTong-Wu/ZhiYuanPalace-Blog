<template>
  <zy-side-bar>
    <div h-full flex flex-col justify-between>
      <div>
        <div flex justify-end h-header>
          <zy-button w="[25%]" h-full px-4 flex items-center justify-center>
            <ZyIcon
              lineName="icon-park-twotone:up-c"
              lineColor="var(--text-2)"
            />
          </zy-button>
          <zy-button
            w="[25%]"
            h-full
            px-4
            flex
            items-center
            justify-center
            @click="toggleFullScreen"
          >
            <ZyIcon
              v-if="!fullScreenFlag"
              lineName="mingcute:fullscreen-fill"
              lineColor="var(--text-2)"
            />
            <ZyIcon
              v-else
              lineName="mingcute:fullscreen-exit-fill"
              lineColor="var(--text-2)"
            />
          </zy-button>
          <zy-button
            w="[25%]"
            h-full
            px-4
            flex
            items-center
            justify-center
            @click="darkModeSwitch"
          >
            <ZyIcon
              v-if="!darkModeFlag"
              lineName="ph:moon-duotone"
              lineColor="var(--text-2)"
            />
            <ZyIcon
              v-else
              lineName="ph:sun-duotone"
              lineColor="var(--text-2)"
            />
          </zy-button>
          <zy-button w="[25%]" h-full px-4 flex items-center justify-center>
            <ZyIcon
              lineName="icon-park-twotone:setting-one"
              lineColor="var(--text-2)"
            />
          </zy-button>
        </div>
      </div>
      <div>
        <div flex justify-end h-header>
          <zy-button w="[25%]" h-full px-4 flex items-center justify-center>
            <ZyIcon
              lineName="solar:skip-previous-bold-duotone"
              lineColor="var(--text-2)"
            />
          </zy-button>
          <zy-button w="[25%]" h-full px-4 flex items-center justify-center>
            <ZyIcon lineName="ph:play-duotone" lineColor="var(--text-2)" />
          </zy-button>
          <zy-button w="[25%]" h-full px-4 flex items-center justify-center>
            <ZyIcon
              lineName="solar:skip-next-bold-duotone"
              lineColor="var(--text-2)"
            />
          </zy-button>
          <zy-button w="[25%]" h-full px-4 flex items-center justify-center>
            <ZyIcon
              lineName="solar:list-bold-duotone"
              lineColor="var(--text-2)"
            />
          </zy-button>
        </div>
      </div>
    </div>
  </zy-side-bar>
</template>

<script setup lang="ts">
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
</script>

<style></style>
