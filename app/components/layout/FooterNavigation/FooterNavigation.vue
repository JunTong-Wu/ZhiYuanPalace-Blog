<template>
  <footer
    class="zy-footer-navigation h-footer flex justify-center landscape:hidden"
  >
    <div
      class="h-full flex mx-auto w-full xs:w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]"
    >
      <ZyLink
        v-for="item in linkList"
        :key="String(item.name)"
        :to="`${item.meta.childrenPath ? item.meta.childrenPath : item.path}`"
        :title="$t(`menu.${String(item.name)}`)"
        class="h-full justify-center w-[20%]"
      >
        <div
          v-zy-ripple
          class="px-5 py-2 rounded-full"
          :class="[
            isActivateRootRouter(route, item.path)
              ? 'bg-theme-50 dark:bg-theme-700'
              : '',
          ]"
        >
          <ZyIcon
            size="1rem"
            :defaultName="item.meta?.defaultIcon"
            defaultColor="var(--text-1)"
            :activatedName="item.meta?.activatedIcon"
            :activated="isActivateRootRouter(route, item.path)"
            activatedColor="var(--text-1)"
          />
        </div>
      </ZyLink>
    </div>
  </footer>
</template>
<script setup lang="ts">
  import "./transition.scss";
  import type { RouteRecordRaw } from "vue-router";
  type IRouteRecordRaw = RouteRecordRaw & {
    meta: {
      childrenPath?: any;
      defaultIcon: string;
      activatedIcon: string;
    };
  };

  const linkList = computed((): IRouteRecordRaw[] => {
    const navigationList =
      getNavigationMapForVisitorMenu() as IRouteRecordRaw[];
    navigationList.forEach((route) => {
      if (route.children && route.children[0]) {
        route.meta.childrenPath = route.children[0].path;
      }
    });
    return navigationList;
  });
  const route = useRoute();
</script>
