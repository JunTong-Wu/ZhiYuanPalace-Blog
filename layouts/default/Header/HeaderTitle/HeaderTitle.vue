<template>
  <nav flex items-center h-full class="header-title" v-if="titleDisable">
    <ul flex h-full class="headerbar-tabs">
      <li
        v-for="tabs in childrenTabs"
        v-zy-ripple
        :class="{ activate: routerActivate(tabs.path) }"
      >
        <zy-link :to="tabs.path" h-full flex items-center justify-center px-6>
          <span>{{ $t(tabs.title) }}</span>
        </zy-link>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import type { Route } from "@/models/menu/index";
import {
  getChildrenTabs,
  getPageLevel,
  getRootPath,
} from "@/models/menu/function";

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

router.beforeEach((to, from, next) => {
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
});
</script>
<style lang="scss" scoped>
.headerbar-tabs {
  transition: all 400ms;
  li {
    border-bottom: 0.3rem solid transparent;
    &.activate {
      border-color: var(--theme-color);
      * {
        font-weight: bold;
      }
    }
  }
}
</style>
