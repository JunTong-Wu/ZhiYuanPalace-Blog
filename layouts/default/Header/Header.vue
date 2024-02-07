<template>
  <header fixed top-0 left-0 right-0 h-header z-24 class="zy-header">
    <div
      class="zy-header-inner"
      flex
      items-center
      justify-between
      h-full
      lg:py-3
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
            <ZyIcon size="0.75rem" defaultName="search" />
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
              defaultName="maximize"
            />
            <ZyIcon v-else size="0.75rem" defaultName="minimize" />
          </zy-button>
          <!-- 多语言抽屉 -->
          <zy-popover title="切换语言" background="var(--bg-4)">
            <template #reference>
              <zy-button
                flex
                items-center
                justify-center
                title="切换语言"
                type="icon"
              >
                <ZyIcon size="0.75rem" defaultName="language" />
              </zy-button>
            </template>
            <template #actions>
              <div p-2 color="text-1">
                <ul>
                  <li
                    v-for="lang in (availableLocales as any)"
                    :key="lang.code"
                    :to="switchLocalePath(lang.code)"
                    @click="switchLanguage(lang.code, lang.iso)"
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
            @click="darkModeSwitch()"
            title="日间/夜间"
            type="icon"
          >
            <ZyIcon size="0.75rem" hidden dark:inline-block defaultName="sun" />
            <ZyIcon size="0.75rem" dark:hidden defaultName="moon" />
          </zy-button>
          <zy-button
            flex
            items-center
            justify-center
            @click="openMoreDrawer()"
            title="更多选项"
            type="icon"
          >
            <ZyIcon size="0.75rem" defaultName="more" />
          </zy-button>
        </div>
      </div>

      <div class="vertical-layout" w-full h-full>
        <div flex items-center w-full h-full justify-between>
          <div h-full flex items-center justify-center>
            <h1 text-sm font-normal ml-4 my-0 class="mobile-title">title</h1>
          </div>
          <div flex items-center h-full>
            <zy-button
              w-header
              h-header
              @click="openSearchDrawer()"
              title="搜索"
              type="transparent"
            >
              <ZyIcon size="0.75rem" defaultName="search" />
            </zy-button>
            <zy-button
              w-header
              h-header
              @click="openMoreDrawer()"
              title="更多选项"
              type="transparent"
            >
              <ZyIcon size="0.75rem" defaultName="more" />
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
// 样式
onMounted(() => {
  window.addEventListener("scroll", () => {
    const top = window.scrollY;
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
});

// 多语言
const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value;
});

const switchLanguage = (code: any, iso: any) => {
  setLocale(code);
  document.documentElement.lang = iso;
};

// 夜间模式
const darkModeSwitch = () => {
  if (!document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.add("dark");
  } else {
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
// const route = useRoute();
// const router = useRouter();
// const title = ref("");
// const titleDisable = ref(true);
// title.value = getTitle(route.fullPath);
// router.beforeEach((to, from, next) => {
//   titleDisable.value = false;
//   next();
//   setTimeout(() => {
//     title.value = getTitle(to.fullPath);
//     titleDisable.value = true;
//   }, 200);
// });

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
  transition: all 200ms;
  /* backdrop-filter: blur(8px); */
}
.zy-header.has-scroll {
  background-color: var(--bg-2);
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
    animation: an-fade-in 0.2s;
  }
}
</style>
