<template>
  <nav
    id="header-tabs"
    class="header-title flex items-center h-full p-3 portrait:p-3 relative"
    v-if="titleDisable"
  >
    <div
      v-if="Array.isArray(childrenTabs) && childrenTabs.length > 1"
      class="top-3 bottom-3 left-3 right-3 absolute bg-[rgba(127,127,127,0.1)] rounded-lg overflow-hidden"
    >
      <div
        id="header-tabs-indicator"
        class="inline-block h-full relative p-1 transition-all opacity-0"
      >
        <div class="h-full landscape:bg-bg-best portrait:bg-[rgba(255,255,255,0.2)] rounded-lg overflow-hidden"></div>
      </div>
    </div>
    <ul
      v-if="Array.isArray(childrenTabs) && childrenTabs.length > 1"
      class="headerbar-tabs flex h-full relative z-10"
    >
      <li v-for="tabs in childrenTabs" :key="tabs.title">
        <ZyLink
          :to="tabs.path"
          class="h-full flex items-center justify-center px-8 portrait:px-6 text-inherit"
        >
          <div
            class="flex items-center text-base gap-2 portrait:text-sm select-none"
          >
            <ZyIcon
              class="landscape:hidden"
              size="1rem"
              :defaultName="tabs.activatedIcon"
            />
            <ZyIcon
              class="portrait:hidden"
              size="1.2rem"
              :defaultName="tabs.activatedIcon"
            />
            {{ $t(tabs.title) }}
          </div>
        </ZyLink>
      </li>
    </ul>
    <div
      v-else-if="Array.isArray(childrenTabs) && childrenTabs.length === 1"
      class="headerbar-title px-4 text-inherit"
    >
      <span
        class="text-2xl font-bold portrait:text-xl portrait:font-normal text-inherit font-vivo"
        >{{ $t(childrenTabs[0].title) }}</span
      >
    </div>
  </nav>
</template>
<script setup lang="ts">
// 标题
import type { Route } from "~/utils/router/type";

const route = useRoute();
const router = useRouter();
const titleDisable = ref(true);
const childrenTabs = ref<Array<Route>>();
const activeTab = ref<string>("");
const { locale } = useI18n();

childrenTabs.value = getChildrenTabs(route.fullPath);

watch(
  () => activeTab.value,
  (newVal) => {
    initIndicator(newVal);
  }
);

watch(
  () => childrenTabs.value,
  (newVal) => {
    if (Array.isArray(newVal) && newVal.length > 1) {
      nextTick(() => {
        initIndicator(activeTab.value);
      });
    }
  }
);

const initIndicator = (path: string) => {
  if (
    path &&
    Array.isArray(childrenTabs.value) &&
    childrenTabs.value.length > 1
  ) {
    const tabIndex = childrenTabs.value.findIndex((item) => {
      return item.path === path;
    });
    indicatorMove(tabIndex);
  }
};

const indicatorMove = (index: number) => {
  const allTabs = document.querySelectorAll(
    "#header-tabs li"
  ) as NodeListOf<HTMLLIElement>;
  const tab = allTabs[index];
  let tabWidth = [];
  for (let i = 0; i < allTabs.length; i++) {
    tabWidth.push(allTabs[i].getBoundingClientRect().width);
  }
  for (let i = 0; i < allTabs.length; i++) {
    allTabs[i].classList.remove("activate");
  }
  const indicator = document.querySelector("#header-tabs-indicator");
  if (tab && indicator) {
    const width = tab.getBoundingClientRect().width;
    const left = tabWidth.slice(0, index).reduce((acc, cur) => acc + cur, 0);
    indicator.style.left = `${left}px`;
    indicator.style.width = `${width}px`;
    indicator.style.opacity = "1";
    tab.classList.add("activate");
  }
};

router.beforeEach(
  (to: { fullPath: string }, from: { fullPath: string }, next: () => void) => {
    if (
      getRootPath(from.fullPath) != getRootPath(to.fullPath) ||
      getPageLevel(from.fullPath) != getPageLevel(to.fullPath)
    ) {
      titleDisable.value = false;
      next();
      setTimeout(() => {
        childrenTabs.value = getChildrenTabs(to.fullPath);
        titleDisable.value = true;
        activeTab.value = to.fullPath;
      }, 200);
    } else {
      next();
      childrenTabs.value = getChildrenTabs(to.fullPath);
      titleDisable.value = true;
      activeTab.value = to.fullPath;
    }
  }
);

onMounted(() => {
  childrenTabs.value = getChildrenTabs(route.fullPath);
  activeTab.value = route.fullPath;
  initIndicator(activeTab.value);
  // 监听浏览器窗口变化
  window.addEventListener("resize", function () {
    initIndicator(activeTab.value);
  });
});

onActivated(() => {
  activeTab.value = route.fullPath;
  initIndicator(activeTab.value);
});

/**
 * 语言切换时
 */
watch(
  () => locale.value,
  () => {
    nextTick().then(() => {
      initIndicator(activeTab.value);
    });
  }
);
</script>
<style lang="scss" scoped>
.headerbar-tabs {
  transition: all 400ms;
  li {
    a {
      position: relative;
      opacity: 0.6;
    }
    &.activate {
      a {
        opacity: 1;
        span {
          position: relative;
          z-index: 2;
        }
      }
    }
  }
}
</style>
