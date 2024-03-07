<template>
  <nav flex items-center h-full class="header-title" v-if="titleDisable">
    <ul flex h-full class="headerbar-tabs">
      <li v-for="tabs in childrenTabs" :key="tabs.title" v-zy-ripple :class="{ activate: routerActivate(tabs.path) }">
        <ZyLink :to="tabs.path" h-full flex items-center justify-center px-4>
          <span text-base sm:text-xl>{{ $t(tabs.title) }}</span>
        </ZyLink>
      </li>
    </ul>
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
    }

    &.activate {
      * {
        font-weight: bold;
      }

      a {
        &::after {
          content: "";
          position: absolute;
          z-index: -1;
          bottom: 1.25rem;
          left: 1rem;
          right: 1rem;
          height: 0.3rem;
          background: var(--theme-color);
        }
      }
    }
  }
}
</style>
