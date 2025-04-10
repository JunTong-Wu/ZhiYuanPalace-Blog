<template>
  <nav
    id="header-tabs"
    class="header-title flex items-center h-full relative"
    v-if="titleDisable"
    :class="{
      'p-1 -mx-1': Array.isArray(childrenTabs) && childrenTabs.length > 1,
      'w-0':
        childrenTabs === null &&
        !isAdminRule &&
        (route.params.id || route.params.album),
    }"
  >
    <div
      v-if="
        Array.isArray(childrenTabs) && childrenTabs.length > 1 && !isAdminRule
      "
      class="inset-1 absolute bg-level-b1 portrait:bg-background rounded portrait:rounded-sm overflow-hidden"
    >
      <div
        id="header-tabs-indicator"
        class="inline-block h-full relative p-1 landscape:p-2 transition-all opacity-0"
      >
        <div
          class="h-full bg-level-4 portrait:bg-level-2 rounded-sm portrait:rounded-xs overflow-hidden landscape:shadow-sm"
        ></div>
      </div>
    </div>
    <ul
      v-if="
        Array.isArray(childrenTabs) && childrenTabs.length > 1 && !isAdminRule
      "
      class="headerbar-tabs flex h-full relative z-10"
    >
      <li
        v-for="tabs in childrenTabs"
        :key="tabs.name"
      >
        <ZyLink
          :to="tabs.path"
          class="h-full flex items-center justify-center px-8 portrait:px-6 portrait:text-inherit landscape:text-theme-600 landscape:dark:text-theme-100"
        >
          <div
            class="flex items-center text-sm gap-2 portrait:text-sm select-none"
          >
            <ZyIcon
              class="landscape:hidden"
              size="1rem"
              :defaultName="tabs.meta.defaultIcon"
              :activatedName="tabs.meta.activatedIcon"
              :activated="activeTab === tabs.path"
            />
            <ZyIcon
              class="portrait:hidden"
              size="1.2rem"
              :defaultName="tabs.meta.defaultIcon"
              :activatedName="tabs.meta.activatedIcon"
              :activated="activeTab === tabs.path"
            />
            {{ $t(`menu.${String(tabs.name)}`) }}
          </div>
        </ZyLink>
      </li>
    </ul>
    <div
      v-else-if="childrenTabs === null && !isAdminRule"
      class="headerbar-title text-inherit flex gap-4 items-center portrait:pl-4"
    >
      <h2
        v-if="!route.params.id && !route.params.album"
        class="text-xl portrait:text-lg portrait:font-normal text-inherit landscape:font-bold landscape:tracking-wider landscape:text-theme-500 landscape:dark:text-theme-100"
      >
        {{ $t(`menu.${String(route.name)}`) }}
      </h2>
    </div>
    <div
      v-else-if="isAdminRule"
      class="headerbar-title text-inherit flex gap-4 items-center portrait:pl-4"
    >
      <h2
        class="text-xl portrait:text-lg portrait:font-normal text-inherit landscape:font-bold landscape:tracking-wider landscape:text-theme-500 landscape:dark:text-theme-100"
      >
        {{ $t(`menu.${String(route.name)}`) }}
      </h2>
    </div>
  </nav>
</template>
<script setup lang="ts">
  import type { RouterOptions } from "vue-router";
  import type { RouteLocationNormalized } from "#vue-router";

  const props = defineProps({
    isAdminRule: {
      type: Boolean,
      default: false,
    },
  });

  // 标题
  const route = useRoute();
  const router = useRouter();
  const titleDisable = ref(true);
  const childrenTabs = ref<RouterOptions["routes"] | null>();
  const activeTab = ref<string>("");
  const { locale } = useI18n();

  childrenTabs.value = getChildrenTabs(route.fullPath);

  watch(
    () => activeTab.value,
    (newVal) => {
      initIndicator(newVal);
    },
  );

  watch(
    () => childrenTabs.value,
    (newVal) => {
      if (Array.isArray(newVal) && newVal.length > 1) {
        nextTick(() => {
          initIndicator(activeTab.value);
        });
      }
    },
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
      "#header-tabs li",
    ) as NodeListOf<HTMLLIElement>;
    const tab = allTabs[index];
    let tabWidth = [];
    for (let i = 0; i < allTabs.length; i++) {
      tabWidth.push(allTabs[i]?.getBoundingClientRect().width);
    }
    for (let i = 0; i < allTabs.length; i++) {
      allTabs[i]?.classList.remove("activate");
    }
    const indicator = document.querySelector(
      "#header-tabs-indicator",
    ) as HTMLElement | null;
    if (tab && indicator) {
      const width = tab.getBoundingClientRect().width;
      // 确保 tabWidth 数组中的元素都是有效的数值
      const validTabWidth = tabWidth.filter(
        (width) => typeof width === "number" && !isNaN(width),
      );
      const left = validTabWidth
        .slice(0, index)
        .reduce(
          (acc, cur) =>
            (typeof acc === "number" ? acc : 0) +
            (typeof cur === "number" ? cur : 0),
          0,
        );
      indicator.style.left = `${left}px`;
      indicator.style.width = `${width}px`;
      indicator.style.opacity = "1";
      tab.classList.add("activate");
    }
  };

  router.beforeEach(
    (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: () => void,
    ) => {
      if (
        getRootPathByRoute(from) != getRootPathByRoute(to) ||
        getPageLevelByRoute(from) != getPageLevelByRoute(to)
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
    },
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
    },
  );
</script>
<style lang="scss" scoped>
  .headerbar-tabs {
    transition: all 400ms;

    li {
      a {
        position: relative;
        opacity: 0.6;
        filter: grayscale(100%);
      }

      &.activate {
        a {
          opacity: 1;
          filter: grayscale(0%);

          span {
            position: relative;
            z-index: 2;
          }
        }
      }
    }
  }
</style>
