<template>
  <header
    fixed
    top-0
    right-0
    h-header
    z-60
    backdrop-blur-xl
    color-text-1
    class="zy-header transition-translate-in"
    :class="{ dark: headerDark }"
  >
    <div
      class="zy-header-inner"
      flex
      items-center
      justify-between
      h-full
    >
      <div class="horizontal-layout">
        <zy-button
          v-if="gobackFlag"
          flex
          items-center
          justify-center
          @click="goback()"
          title="返回"
          type="icon"
        >
          <ZyIcon size="0.75rem" defaultName="arrow-left" />
        </zy-button>
      </div>

      <div class="vertical-layout" h-full>
        <div h-full flex items-center justify-center pl-2  w-18>
          <zy-button
            v-if="gobackFlag"
            flex
            items-center
            justify-center
            @click="goback()"
            title="返回"
            type="transparent"
          >
            <ZyIcon defaultName="arrow-left" />
          </zy-button>
          <div>
            <h1
              text-base
              font-normal
              ml-2
              my-0
              class="mobile-title"
              v-if="titleDisable"
            >
              {{ $t(title) }}
            </h1>
          </div>
        </div>
      </div>

      <div h-full py-2 w="[50%]">
        <div h-full border="1 solid bordercolor" bg="bg-headerBar" w="[1/2]" rounded-xl>
          <div h-full w-full flex items-center justify-center color="text-4">Music Bar</div>
        </div>
      </div>

      <div class="vertical-layout" h-full>
        <div flex items-center w-full h-full justify-between>
          <div flex items-center h-full>
            <zy-button
              w-header
              h-header
              @click="openSearchDrawer()"
              title="搜索"
              type="transparent"
            >
              <ZyIcon defaultName="search" />
            </zy-button>
            <zy-button
              w-header
              h-header
              @click="openMoreDrawer()"
              title="更多选项"
              type="transparent"
            >
              <ZyIcon defaultName="more" />
            </zy-button>
          </div>
        </div>
      </div>

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

// 标题
const route = useRoute();
const path = route.fullPath;
const title = ref("empty");
title.value = getMobileTitle(path);
const router = useRouter();
const titleDisable = ref(true);
const headerDark = ref(false);

router.beforeEach((to, from, next) => {
  titleDisable.value = false;
  next();
  setTimeout(() => {
    title.value = getMobileTitle(to.fullPath);
    titleDisable.value = true;
  }, 200);
});

// 返回
const isFirstLayer = (path: string) => {
  // 移除路径两端的斜杠，然后分割路径
  const parts = path
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/");

  // 如果路径是"/"或者分割后的部分数量等于1，则返回true
  // 否则返回false
  return path === "/" || (parts.length === 1 && parts[0] !== "");
};
const gobackFlag = ref(false);
const gobackInit = (path: string) => {
  if (isFirstLayer(path)) {
    gobackFlag.value = false;
  } else {
    gobackFlag.value = true;
  }
};
gobackInit(route.fullPath);
router.beforeEach((to, from, next) => {
  gobackInit(to.fullPath);
  next();
});
const getParentPath = () => {
  let currentPath = window.location.pathname;
  let lastIndex = currentPath.lastIndexOf("/");
  // 如果当前路径已经是根路径，或者只有一个斜杠，则没有上一级路径
  if (lastIndex <= 0) {
    return "/";
  }
  // 去掉最后一个路径段
  let parentPath = currentPath.slice(0, lastIndex);
  // 去掉尾部斜杠
  return parentPath.replace(/\/+$/, "");
};
const goback = () => {
  router.replace(getParentPath());
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
</script>
<style lang="scss" scoped>
@media (orientation: landscape) {
  /* 横屏 */
  .zy-header-inner {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
.zy-header {
  background-color: var(--bg-header-bar);
}
.zy-header.has-scroll {
  background-color: var(--bg-header-bar);
}
</style>
