<template>
  <header class="select-none">
    <!-- 顶栏遮蔽 -->
    <div
      class="h-header w-full relative z-10 pointer-events-none portrait:bg-level-2"
    >
      <div class="h-header reverse-rounded"></div>
    </div>
    <div
      class="absolute z-10 top-0 left-0 h-header w-full transition-all backdrop-blur-3xl portrait:bg-level-2"
      :class="{
        'bg-background': progress < 1,
        'bg-headBar shadow-sm': progress > 1,
      }"
    ></div>

    <!-- 主体区域 -->
    <div
      class="absolute z-20 top-0 left-0 right-0 h-header portrait:pl-1 landscape:px-8 flex items-center justify-between transition-all"
      :class="{
        'landscape:translate-y-4': progress < 1,
      }"
    >
      <div class="flex items-center h-full">
        <!-- 标题区 -->
        <div class="flex items-center h-full mr-4 landscape:py-2">
          <GoBackButton
            class="flex-none"
            v-if="!isAdminHeader"
          />
          <HeaderTitle
            class="flex-none"
            :isAdminHeader="isAdminHeader"
          />
          <ClientOnly>
            <PostTitle class="flex-1" />
          </ClientOnly>
        </div>
      </div>
      <div class="flex items-center h-full gap-4 landscape:py-2">
        <!-- 时钟区 -->
        <!-- <ClientOnly>
          <div class="layout-clock h-full">
            <div
              class="bg-background w-72 flex flex-col items-center px-4 rounded-full h-[70%] relative top-[15%] justify-center">
              <span class="time text-sm text-text-1">{{ time }}</span>
              <div class="date text-xs text-text-3">{{ todayDate }}</div>
            </div>
          </div>
        </ClientOnly> -->

        <!-- 音乐播放器 -->
        <div class="flex items-center h-full -mr-2">
          <MusicPlayer
            class="h-music select-none text-white landscape:mr-2 landscape:-ml-2 portrait:fixed left-0 top-music w-music landscape:xs:w-72 landscape:md:w-music z-50"
          />
        </div>

        <div
          class="h-full flex items-center landscape:bg-level-2 landscape:rounded pl-2"
        >
          <!-- 按键区 -->
          <div class="flex justify-end h-full items-center">
            <BackToTop class="-ml-2" />

            <div
              v-if="!isAdminHeader"
              class="portrait:hidden p-2 -ml-2 h-16 w-16"
            >
              <ZyButton
                class="flex items-center justify-center w-full h-full"
                @click="openSearchDrawer()"
                title="搜索"
                type="icon"
              >
                <UIcon
                  name="i-solar-minimalistic-magnifer-linear"
                  class="w-5 h-5"
                />
              </ZyButton>
            </div>

            <!-- 多语言抽屉 -->
            <div class="portrait:hidden p-2 -ml-2 h-16 w-16">
              <ZyPopover
                title="切换语言"
                background="var(--bg-level-1)"
                class="w-full h-full"
              >
                <template #reference>
                  <ZyButton
                    class="flex items-center justify-center w-full h-full"
                    title="切换语言"
                    type="icon"
                  >
                    <UIcon
                      name="i-solar-planet-linear"
                      class="w-5 h-5"
                    />
                  </ZyButton>
                </template>
                <template #actions>
                  <LanguagePopoverInner />
                </template>
              </ZyPopover>
            </div>

            <div class="portrait:hidden p-2 -ml-2 h-16 w-16">
              <ZyButton
                class="flex items-center justify-center w-full h-full"
                @click="darkModeSwitch"
                title="日间/夜间"
                type="icon"
              >
                <UIcon
                  name="i-solar-sun-linear"
                  class="w-5 h-5 hidden dark:inline-block"
                />
                <UIcon
                  name="i-solar-moon-linear"
                  class="w-5 h-5 dark:hidden"
                />
              </ZyButton>
            </div>

            <!-- 收起右侧工具栏按钮 -->
            <div
              class="portrait:hidden transition-all duration-300"
              :class="{
                'w-0 h-0 scale-0 p-0 ml-0':
                  disabledLayoutControl || !pageHasToolbarDebounceFlag,
                'h-16 w-16 p-2 -ml-2':
                  !disabledLayoutControl && pageHasToolbarDebounceFlag,
              }"
            >
              <ZyButton
                class="flex items-center justify-center w-full h-full"
                @click="switchToolbarClick"
                title="收起工具栏"
                type="icon"
              >
                <UIcon
                  v-if="!hideToolbar"
                  name="i-solar-logout-2-linear"
                  class="w-5 h-5 rotate-180"
                />
                <UIcon
                  v-if="hideToolbar"
                  name="i-solar-login-2-linear"
                  class="w-5 h-5 rotate-180"
                />
              </ZyButton>
            </div>

            <div
              v-if="isAdminHeader"
              class="portrait:hidden p-2 -ml-2 h-16 w-16"
            >
              <ZyButton
                class="flex items-center justify-center w-full h-full"
                @click="backToHome"
                title="回到前台"
                type="icon"
              >
                <UIcon
                  name="i-solar-home-smile-linear"
                  class="w-5 h-5"
                />
              </ZyButton>
            </div>

            <div class="portrait:hidden p-2 -ml-2 h-16 w-16">
              <ZyButton
                class="flex items-center justify-center w-full h-full"
                @click="toggleFullScreen"
                title="全屏/退出全屏"
                type="icon"
              >
                <UIcon
                  v-if="!fullScreenFlag"
                  name="i-solar-maximize-linear"
                  class="w-5 h-5"
                />
                <UIcon
                  v-else
                  name="i-solar-minimize-linear"
                  class="w-5 h-5"
                />
              </ZyButton>
            </div>

            <div
              v-if="!isAdminHeader"
              class="p-2 -ml-2 h-16 w-16"
            >
              <ZyButton
                class="flex items-center justify-center w-full h-full"
                @click="openMoreDrawer()"
                title="更多选项"
                type="icon"
              >
                <UIcon
                  name="i-solar-hamburger-menu-linear"
                  class="w-5 h-5"
                />
              </ZyButton>
            </div>

            <div
              v-if="isAdminHeader"
              class="landscape:hidden p-2 -ml-2 h-16 w-16"
            >
              <ZyButton
                class="flex items-center justify-center w-full h-full"
                @click="openAdminNavigationDrawer()"
                title="菜单"
                type="icon"
              >
                <UIcon
                  name="i-solar-hamburger-menu-linear"
                  class="w-5 h-5"
                />
              </ZyButton>
            </div>
          </div>
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
      maskColor="var(--bg-mask)"
      :maskBlur="true"
    >
    </ZyDrawer>
    <!-- 设置抽屉 -->
    <ZyDrawer
      title="设置"
      :display="moreDisplay"
      @cancel="closeMoreDrawer"
      position="right"
      size="var(--drawer-width)"
      maskColor="rgba(0,0,0,0.4)"
      background="var(--bg-level-1)"
    >
      <MoreDrawerInner @closeDrawer="closeMoreDrawer">
        <template #footer>
          <div
            class="flex justify-end h-full items-center gap-2 landscape:hidden"
          >
            <ZyButton
              class="flex items-center justify-center p-2"
              @click="toggleFullScreen"
              title="全屏/退出全屏"
              type="icon"
            >
              <UIcon
                v-if="!fullScreenFlag"
                name="i-solar-maximize-linear"
                class="w-5 h-5"
              />
              <UIcon
                v-else
                name="i-solar-minimize-linear"
                class="w-5 h-5"
              />
            </ZyButton>
            <ZyButton
              class="flex items-center justify-center p-2"
              @click="darkModeSwitch"
              title="日间/夜间"
              type="icon"
            >
              <UIcon
                name="i-solar-sun-linear"
                class="w-5 h-5 hidden dark:inline-block"
              />
              <UIcon
                name="i-solar-moon-linear"
                class="w-5 h-5 dark:hidden"
              />
            </ZyButton>
            <ZyPopover
              title="切换语言"
              background="var(--bg-level-1)"
              position="top-right"
            >
              <template #reference>
                <ZyButton
                  class="flex items-center justify-center p-2"
                  title="切换语言"
                  type="icon"
                >
                  <UIcon
                    name="i-solar-planet-linear"
                    class="w-5 h-5"
                  />
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
    <ZyDrawer
      title="导航"
      :display="adminNavigationDisplay"
      @cancel="closeAdminNavigationDrawer"
      position="top"
      size="100%"
      background="var(--bg-background)"
    >
      <AdminNavigationDrawerInner @closeDrawer="closeAdminNavigationDrawer">
        <template #footer>
          <div
            class="flex justify-end h-full items-center gap-4 landscape:hidden"
          >
            <ZyButton
              v-if="isAdminHeader"
              class="flex items-center justify-center"
              @click="backToHome"
              title="回到前台"
              type="icon"
            >
              <UIcon
                name="i-solar-home-smile-linear"
                class="w-5 h-5"
              />
            </ZyButton>
            <ZyButton
              class="flex items-center justify-center"
              @click="toggleFullScreen"
              title="全屏/退出全屏"
              type="icon"
            >
              <UIcon
                v-if="!fullScreenFlag"
                name="i-solar-maximize-linear"
                class="w-5 h-5"
              />
              <UIcon
                v-else
                name="i-solar-minimize-linear"
                class="w-5 h-5"
              />
            </ZyButton>
            <ZyButton
              class="flex items-center justify-center"
              @click="darkModeSwitch"
              title="日间/夜间"
              type="icon"
            >
              <UIcon
                name="i-solar-sun-linear"
                class="w-5 h-5 hidden dark:inline-block"
              />
              <UIcon
                name="i-solar-moon-linear"
                class="w-5 h-5 dark:hidden"
              />
            </ZyButton>
            <ZyPopover
              title="切换语言"
              background="var(--bg-level-1)"
              position="top-right"
            >
              <template #reference>
                <ZyButton
                  class="flex items-center justify-center"
                  title="切换语言"
                  type="icon"
                >
                  <UIcon
                    name="i-solar-planet-linear"
                    class="w-5 h-5"
                  />
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
  </header>
</template>
<script setup lang="ts">
  import "./transition.scss";

  const props = defineProps({
    isAdminHeader: {
      type: Boolean,
      default: false,
    },
    pageHasToolbar: {
      type: Boolean,
      default: false,
    },
    hideToolbar: {
      type: Boolean,
      default: false,
    },
    disabledLayoutControl: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(["switchToolbarClick"]);

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

  // 背景变化
  const progress = ref(0);
  const calculateProgress = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    const scrollPercent = scrollTop / (scrollHeight - clientHeight);
    progress.value = Math.round(scrollPercent * 100) || 0;
  };
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  onMounted(() => {
    window.addEventListener("scroll", calculateProgress);
  });

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
    router.replace("/");
  };

  // 切换右侧工具栏
  const switchToolbarClick = () => {
    emit("switchToolbarClick");
  };

  // 用于删除右侧工具栏按钮的防抖
  const pageHasToolbarDebounceFlag = ref(false);
  const switchPageHasToolbarDebounceFunc = (enable: Boolean) => {
    if (enable) {
      pageHasToolbarDebounceFlag.value = true;
    } else {
      pageHasToolbarDebounceFlag.value = false;
    }
  };
  const switchPageHasToolbarDebounce = debounce(
    switchPageHasToolbarDebounceFunc,
    200,
  );
  onMounted(() => {
    pageHasToolbarDebounceFlag.value = props.pageHasToolbar;
  });

  watch(
    () => props.pageHasToolbar,
    () => {
      if (props.pageHasToolbar) {
        switchPageHasToolbarDebounce(true);
      } else {
        switchPageHasToolbarDebounce(false);
      }
    },
  );
</script>
<style>
  ::view-transition-new(root),
  ::view-transition-old(root) {
    animation: none;
  }
</style>
<style lang="scss" scoped>
  .reverse-rounded {
    --background: var(--bg-level-2);
    --rounded: var(--border-radius-lg);
    position: relative;
    z-index: 10;

    &::after {
      display: none;
      position: absolute;
      content: "";
      width: var(--rounded);
      height: var(--rounded);
      line-height: 100px;
      bottom: calc(0rem - var(--rounded));
      background-image: radial-gradient(
        var(--rounded) at var(--rounded) var(--rounded),
        transparent var(--rounded),
        var(--background) var(--rounded)
      );
    }

    &::before {
      display: none;
      position: absolute;
      content: "";
      width: var(--rounded);
      height: var(--rounded);
      line-height: 100px;
      bottom: calc(0rem - var(--rounded));
      right: 0;
      background-image: radial-gradient(
        var(--rounded) at 0rem var(--rounded),
        transparent var(--rounded),
        var(--background) var(--rounded)
      );
    }
  }

  @media (orientation: portrait) {
    .reverse-rounded {
      --background: var(--bg-level-1);
      --rounded: var(--border-radius-xs);
    }
  }

  .layout-clock {
    .date {
      max-height: 0rem;
      overflow: hidden;
      opacity: 0;
      transition:
        max-height 0.2s ease-in-out,
        opacity 0.1s ease-in-out;
    }

    &:hover {
      .date {
        opacity: 1;
        max-height: 1rem;
      }
    }
  }
</style>
