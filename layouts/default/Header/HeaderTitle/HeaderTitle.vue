<template>
  <nav class="header-title flex items-center h-full p-3 portrait:p-3" v-if="titleDisable">
    <ul v-if="Array.isArray(childrenTabs) && childrenTabs.length > 1" class="headerbar-tabs flex h-full rounded-full border border-bordercolor overflow-hidden">
      <li
        v-for="tabs in childrenTabs"
        :key="tabs.title"
        class="landscape:bg-bg-gray"
        :class="{ activate: routerActivate(tabs.path) }"
      >
        <ZyLink
          :to="tabs.path"
          class="h-full flex items-center justify-center px-8 portrait:px-6"
        >
          <span class="text-base">{{ $t(tabs.title) }}</span>
        </ZyLink>
      </li>
    </ul>
    <div v-else-if="Array.isArray(childrenTabs) && childrenTabs.length === 1" class="headerbar-title px-3">
      <span class="text-xl">{{ $t(childrenTabs[0].title) }}</span>
    </div>
  </nav>
</template>
<script setup lang="ts">
// 标题
const route = useRoute();
const router = useRouter();
const titleDisable = ref(true);
const childrenTabs = ref<Array<Route>>();
childrenTabs.value = getChildrenTabs(route.fullPath);
const routerActivate = (path: string) => {
  if (route.fullPath == path) {
    return true;
  } else {
    return false;
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
      }, 200);
    } else {
      childrenTabs.value = getChildrenTabs(to.fullPath);
      next();
    }
  }
);
</script>
<style lang="scss" scoped>
.headerbar-tabs {
  transition: all 400ms;

  li {
    a {
      position: relative;
      color: var(--text-3);
    }

    &.activate {
      a {
        color: var(--text-1);
        &::after {
          content: "";
          position: absolute;
          z-index: 1;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: var(--bg-best);
          border-radius: 10rem;
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        }
        span {
          position: relative;
          z-index: 2;
        }
      }
    }
  }
}
</style>
