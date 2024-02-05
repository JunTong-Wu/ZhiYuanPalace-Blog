<template>
  <header fixed top-0 left-0 right-0 h-header z-24 class="zy-header">
    <div
      class="zy-header-inner"
      flex
      items-center
      justify-between
      h-full
      sm:px-6
      lg:px-24
      lg:py-3
      xl:px-24
    >
      <div class="horizontal-layout"></div>
      <div class="horizontal-layout">
        <div flex justify-end h-full items-center gap-2>
          <zy-button
            flex
            items-center
            justify-center
            @click="openSearchDrawer()"
            title="搜索"
            type="icon"
          >
            <ZyIcon size="0.75rem" lineName="fluent:search-16-regular" />
          </zy-button>
          <zy-button
            flex
            items-center
            justify-center
            @click="toggleFullScreen"
            title="全屏/退出全屏"
            type="icon"
          >
            <ZyIcon
              v-if="!fullScreenFlag"
              size="0.75rem"
              lineName="fluent:full-screen-maximize-16-regular"
            />
            <ZyIcon
              v-else
              size="0.75rem"
              lineName="fluent:full-screen-minimize-16-regular"
            />
          </zy-button>
          <!-- 多语言抽屉 -->
          <zy-popover title="切换语言" background="var(--bg-5)">
            <template #reference>
              <zy-button
                flex
                items-center
                justify-center
                title="切换语言"
                type="icon"
              >
                <ZyIcon
                  size="0.75rem"
                  lineName="fluent:local-language-16-regular"
                />
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
                      <span text-xs>{{ lang.name }}</span>
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
          <zy-button
            flex
            items-center
            justify-center
            @click="darkModeSwitch"
            title="日间/夜间"
            type="icon"
          >
            <ZyIcon
              v-if="darkModeFlag == false"
              size="0.75rem"
              lineName="fluent:weather-sunny-16-regular"
            />
            <ZyIcon
              v-else-if="darkModeFlag == true"
              size="0.75rem"
              lineName="fluent:weather-moon-16-regular"
            />
            <ZyIcon
              v-else
              size="0.75rem"
              lineName="fluent:dark-theme-20-regular"
            />
          </zy-button>
          <zy-button
            flex
            items-center
            justify-center
            @click="openMoreDrawer()"
            title="更多选项"
            type="icon"
          >
            <ZyIcon lineName="fluent:more-vertical-16-regular" />
          </zy-button>
        </div>
      </div>

      <div class="vertical-layout" w-full>
        <div flex items-center w-full justify-between px-2>
          <div h-full flex items-center justify-center>
            <h1 text-sm font-normal v-if="titleDisable" class="mobile-title">
              {{ $t(title) }}
            </h1>
          </div>
          <div flex items-center>
            <zy-button
              flex
              items-center
              justify-center
              @click="openSearchDrawer()"
              title="搜索"
              type="transparent"
            >
              <ZyIcon size="0.75rem" lineName="fluent:search-16-regular" />
            </zy-button>
            <zy-button
              h-full
              @click="openMoreDrawer()"
              title="更多选项"
              type="transparent"
            >
              <ZyIcon lineName="fluent:more-vertical-16-regular" />
            </zy-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索抽屉 -->
    <zy-drawer
      title="搜索"
      :display="searchDisplay"
      @cancel="closeSearchDrawer"
      position="top"
      size="100%"
    >
    </zy-drawer>
    <!-- 更多选项抽屉 -->
    <zy-drawer
      title="更多选项"
      :display="moreDisplay"
      @cancel="closeMoreDrawer"
      position="right"
      size="21rem"
      background="var(--bg-5)"
    >
    </zy-drawer>
  </header>
</template>
<script setup lang="ts">
import { getTitle } from "@/src/core/function/urlTitleMap";

// 样式
onMounted(() => {
  const mainScroll = document.querySelector(".main-scroll");
  if (mainScroll) {
    mainScroll.addEventListener("scroll", () => {
      const top = mainScroll.scrollTop;
      if (top > 1) {
        const header = document.querySelector(".zy-header");
        if (header) {
          header.classList.add("has-scroll");
        }
      } else {
        const header = document.querySelector(".zy-header");
        if (header) {
          header.classList.remove("has-scroll");
        }
      }
    });
  }
});

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

// 标题
const route = useRoute();
const router = useRouter();
const title = ref("");
const titleDisable = ref(true);
title.value = getTitle(route.fullPath);
router.beforeEach((to, from, next) => {
  titleDisable.value = false;
  next();
  setTimeout(() => {
    title.value = getTitle(to.fullPath);
    titleDisable.value = true;
  }, 400);
});

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
@media (orientation: landscape) {
  /* 横屏 */
  .zy-header-inner {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
<style lang="scss" scoped>
@keyframes an-fade-in {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
.zy-header {
  transition: all 400ms;
  backdrop-filter: blur(8px);
}
.zy-header.has-scroll {
  background-color: var(--bg-mask);
}
.zy-header-inner {
  position: relative;
  &::after {
    //content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    pointer-events: none;
    background: url(https://www.logosc.cn/img/MulticolorGlows.png) no-repeat
      top/900px;
  }

  .mobile-title {
    animation: an-fade-in 0.7s;
  }
}
</style>
