<template>
  <header class="select-none">
    <!-- 顶栏遮蔽 -->
    <div
      class="h-header w-full bg-level-b1 portrait:bg-level-1 relative z-10 pointer-events-none"
    >
      <div class="h-header reverse-rounded"></div>
    </div>
    <div
      class="absolute z-10 top-0 left-0 h-header w-full bg-level-b1 portrait:bg-level-1"
    ></div>
    <div
      class="absolute z-10 portrait:hidden top-0 left-0 w-full h-full pointer-events-none"
    >
      <img
        src="@/assets/image/bg.png"
        alt=""
        class="h-header w-sidebar object-fill"
      />
    </div>

    <!-- 主体区域 -->
    <div
      class="absolute z-20 top-0 left-0 right-0 h-header flex items-center justify-between landscape:pr-2"
    >
      <div class="flex items-center h-full">
        <div
          class="portrait:hidden flex items-center h-full w-4 sm:w-sidebar relative flex-none"
        >
          <!-- 收起侧边导航栏按钮 -->
          <div
            v-if="!disabledLayoutControl"
            class="p-2 h-header w-header flex-none"
          >
            <ZyButton
              class="flex items-center justify-center w-full h-full"
              @click="switchSidebarClick"
              title="收起侧边栏"
              type="transparent"
            >
              <UIcon
                v-if="!hideSidebar"
                name="i-ph-text-outdent"
                class="w-5 h-5"
              />
              <UIcon
                v-if="hideSidebar"
                name="i-ph-text-indent"
                class="w-5 h-5"
              />
            </ZyButton>
          </div>
          <!-- 图标区 -->
          <Logo
            class="absolute right-8 hidden sm:block portrait:hidden cursor-pointer"
            :class="{
              'left-4': disabledLayoutControl,
              'left-header': !disabledLayoutControl,
            }"
            @click="backToHome"
          />
        </div>
        <!-- 标题区 -->
        <div
          class="w-1 h-6 bg-theme-500 inline-block rounded portrait:hidden mr-4 flex-none"
        ></div>
        <div class="flex items-center h-full mx-1 mr-4">
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
      <div class="flex items-center h-full gap-4">
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
          <!-- 歌词区 -->
          <div
            class="hidden landscape:lg:block p-2 py-1 -ml-2 h-header w-72"
            title="歌词"
            type="text"
          >
            <div
              class="rounded-xs h-full w-full flex items-center justify-center"
            >
              <span class="text-xs text-right text-text-2 w-72 px-4">{{
                desktopLyrics
              }}</span>
            </div>
          </div>
          <MusicPlayer
            class="landscape:-ml-2 portrait:fixed left-0 top-music w-music landscape:xs:w-72 landscape:md:w-music z-50 portrait:bg-headBar portrait:backdrop-blur-3xl"
            @refresh-lyric="refreshLyric"
          />
        </div>

        <div class="h-full flex items-center">
          <div
            class="w-1 h-6 bg-theme-500 inline-block rounded portrait:hidden mr-4 flex-none"
          ></div>
          <!-- 按键区 -->
          <div class="flex justify-end h-full items-center">
            <BackToTop class="" />

            <div
              v-if="!isAdminHeader"
              class="portrait:hidden p-2 -ml-2 h-header w-header"
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
            <div class="portrait:hidden p-2 -ml-2 h-header w-header">
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

            <div class="portrait:hidden p-2 -ml-2 h-header w-header">
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
              v-if="!disabledLayoutControl && pageHasToolbarDebounceFlag"
              class="portrait:hidden p-2 -ml-2 h-header w-header"
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
              class="portrait:hidden p-2 -ml-2 h-header w-header"
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

            <div class="portrait:hidden p-2 -ml-2 h-header w-header">
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
              class="p-2 -ml-2 h-header w-header"
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
              class="landscape:hidden p-2 -ml-2 h-header w-header"
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
  import './transition.scss';

  const props = defineProps({
    isAdminHeader: {
      type: Boolean,
      default: false,
    },
    hideSidebar: {
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

  const emit = defineEmits(['switchSidebarClick', 'switchToolbarClick']);

  // 使用类型断言来处理 TypeScript 的类型检查
  declare global {
    interface Window {
      ActiveXObject?: any;
    }
  }

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

  // 时钟
  const time = ref('');
  const updateTime = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
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
  const todayDate = ref('');
  const updateDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const week = date.getDay();
    const weekStr = ['日', '一', '二', '三', '四', '五', '六'];
    todayDate.value = `${year}-${month}-${day} 星期${weekStr[week]}`;
  };
  // 初始化时间
  updateDate();

  // 刷新桌面歌词
  const desktopLyrics = ref('');
  const refreshLyric = (result: any) => {
    desktopLyrics.value = result.lyric;
  };

  const router = useRouter();
  // 管理员回到前台
  const backToHome = () => {
    router.replace('/');
  };

  // 切换侧边栏
  const switchSidebarClick = () => {
    emit('switchSidebarClick');
  };

  // 切换右侧工具栏
  const switchToolbarClick = () => {
    emit('switchToolbarClick');
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
    500,
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
    --background: var(--bg-level-b1);
    --rounded: var(--border-radius-lg);
    position: relative;
    z-index: 10;

    &::after {
      position: absolute;
      content: '';
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
      position: absolute;
      content: '';
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
