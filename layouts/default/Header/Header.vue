<template>
  <header class="h-header color-text-1 overflow-hidden">
    <div class="absolute top-0 z-0 h-header w-full bg-gradient-to-b from-themeColorTranslucent to-musicBar pointer-events-none opacity-70"></div>
    <div class="zy-header-logo-wrapper portrait:hidden absolute top-1/2 z-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-header">
      <Logo class="px-4 select-none" />
      <h1 class="font-vivo text-xl font-bold text-center opacity-50 pointer-events-none select-none">
        {{$t("zhiYuanPalace")}}
      </h1>
    </div>
    <div
      class="zy-header-inner flex items-center justify-between h-full landscape:pr-4 portrait:pr-0 relative z-10"
    >
      <div class="flex items-center h-full overflow-hidden">
        <GoBackButton />
        <HeaderTitle />
      </div>

      <div class="h-full landscape:hidden">
        <div class="flex items-center w-full h-full justify-between">
          <div class="flex items-center h-full">
            <ZyButton
              class="w-header h-header"
              @click="openSearchDrawer()"
              title="搜索"
              type="transparent"
            >
              <ZyIcon defaultName="search" size="1.25rem" />
            </ZyButton>
            <ZyButton
              class="w-header h-header"
              @click="openMoreDrawer()"
              title="更多选项"
              type="transparent"
            >
              <ZyIcon defaultName="more" size="1.25rem" />
            </ZyButton>
          </div>
        </div>
      </div>

      <div class="portrait:hidden">
        <div class="flex justify-end h-full items-center gap-4">
          <ZyButton
            class="flex items-center justify-center"
            @click="openSearchDrawer()"
            title="搜索"
            type="icon"
          >
            <ZyIcon size="1.5rem" defaultName="search" />
          </ZyButton>
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
          <!-- 多语言抽屉 -->
          <ZyPopover title="切换语言" background="var(--bg-panel)">
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
              <div class="color-text-1 w-40">
                <ul>
                  <li
                    v-for="lang in availableLocales"
                    :key="lang.code"
                    :to="switchLocalePath(lang.code)"
                    @click="switchLanguage(lang.code, lang.iso)"
                    class="border-t-0 border-l-0 border-r-0 border-b-1 border-solid border-bordercolor"
                  >
                    <label
                      class="w-full flex justify-between p-4 h-14 hover:bg-theme hover:text-white cursor-pointer"
                    >
                      <span class="text-sm">{{ lang.name }}</span>
                      <input
                        type="radio"
                        name="lang"
                        :checked="lang.code == locale"
                        class="hidden"
                      />
                    </label>
                  </li>
                </ul>
              </div>
            </template>
          </ZyPopover>
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
          <ZyButton
            class="flex items-center justify-center"
            @click="openMoreDrawer()"
            title="更多选项"
            type="icon"
          >
            <ZyIcon size="1.5rem" defaultName="more" />
          </ZyButton>
        </div>
      </div>
    </div>
    <!-- 搜索抽屉 -->
    <ZyDrawer
      title="搜索"
      :display="searchDisplay"
      @cancel="closeSearchDrawer"
      position="top"
      size="100%"
    >
    </ZyDrawer>
    <!-- 更多选项抽屉 -->
    <ZyDrawer
      title="更多选项"
      :display="moreDisplay"
      @cancel="closeMoreDrawer"
      position="right"
      size="21rem"
      background="var(--bg-panel)"
    >
    </ZyDrawer>
  </header>
</template>
<script setup lang="ts">
import HeaderTitle from "./HeaderTitle/HeaderTitle.vue";
import Logo from "~/layouts/default/Logo/Logo.vue";

// 使用类型断言来处理 TypeScript 的类型检查
declare global {
  interface Window {
    ActiveXObject?: any;
  }
}

// 多语言
const { locale, locales, setLocale } = useI18n() as any;
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value;
});

const switchLanguage = (code: any, iso: any) => {
  setLocale(code);
  document.documentElement.lang = iso;
};

// 夜间模式
const darkModeSwitch = (e) => {
  // 检查是否支持 startViewTransition API
  if (typeof document.startViewTransition === "function") {
    // 支持 startViewTransition API，使用过渡动画
    const transition = document.startViewTransition(() => {
      if (!document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    });

    const x = e.clientX;
    const y = e.clientY;

    const tragetRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    transition.ready.then(() => {
      document.documentElement.animate(
          {
            clipPath: [`circle(0% at ${x}px ${y}px)`, `circle(${tragetRadius}px at ${x}px ${y}px)`],
          },
          {
            duration: 400,
            pseudoElement: "::view-transition-new(root)",
          }
      );
    });
  } else {
    // 不支持 startViewTransition API，直接切换暗模式
    if (!document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};

// 全屏
const fullScreen = () => {
  const element = document.documentElement as any; //若要全屏页面div
  //IE 10及以下ActiveXObject
  if (window.ActiveXObject) {
    const WsShell = new window.ActiveXObject("WScript.Shell");
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
    const WsShell = new window.ActiveXObject("WScript.Shell");
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

// 返回

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
<style lang="scss" scoped>
.zy-header-logo-wrapper {
  h1 {
    width: auto;
    max-width: 0%;
    overflow: hidden;
    white-space: nowrap;
    transition: max-width 0.3s ease-in-out;
  }
  &:hover {
    h1 {
      max-width: 100%;
    }
  }
}
</style>