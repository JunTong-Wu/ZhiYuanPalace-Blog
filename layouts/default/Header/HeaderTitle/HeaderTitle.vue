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
type Route = {
  path: string;
  title: string;
  defaultIcon?: string;
  activatedIcon?: string;
  order: number;
  children?: Route[];
};

// 标题
const route = useRoute();
const router = useRouter();
const titleDisable = ref(true);
const childrenTabs = ref<Array<Route>>();
const getChildrenTabs = (path: string) => {
  const linkList = getNavigationMap() as Route[];
  for (const routeItem of linkList) {
    if (!routeItem.children || !routeItem.children.length) {
      if (routeItem.path === path) {
        return [routeItem];
      }
    }
  }
  for (const routeItem of linkList) {
    if (routeItem.children) {
      for (const children of routeItem.children) {
        if (children.path == path) {
          return routeItem.children;
        }
      }
    }
  }
};
childrenTabs.value = getChildrenTabs(route.fullPath);
const getPageLevel = (path: string) => {
  // 移除路径两端的斜杠，然后分割路径
  const parts = path
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/");
  if (path === "/") {
    return 1;
  } else {
    return parts.length;
  }
};
const getRootPath = (path: string) => {
  // 移除路径两端的斜杠，然后分割路径
  const parts = path
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/");

  const rootPath = `/${parts[0]}`;
  const linkList = getNavigationMap() as Route[];
  for (const route of linkList) {
    if (route.path === rootPath) {
      return route.path;
    }
  }
  return "/";
};

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
    border-bottom: 0.2rem solid transparent;
    &.activate {
      border-color: var(--theme-color);
      * {
        font-weight: bold;
      }
    }
  }
}
</style>
