<template>
  <nav>
    <ul>
      <li v-for="n in linkList" h-14 flex>
        <zy-link
          :to="`/${locale}${n.path}`"
          v-zy-ripple
          w-full
          :title="$t(n.title)"
          px-7
          class="sidebar-navigation"
          :class="{ activate: routerActivate(n.path) }"
        >
          <ZyIcon
            size="1.5rem"
            :lineName="n.lineIcon"
            lineColor="var(--text-3)"
            :filledName="n.filledIcon"
            :filled="routerActivate(n.path)"
            filled-color="var(--primary-6)"
          />
          <span ml-4>{{ $t(n.title) }}</span>
        </zy-link>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import { getMap } from "@/src/core/function/urlTitleMap";

const linkList = getMap();

const route = useRoute();
const { locale } = useI18n();
const routerActivate = (path: string) => {
  if (path != "/") {
    if (route.path.includes(path)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (
      route.path == "/" ||
      route.path == `/${locale.value}` ||
      route.path == `/${locale.value}/`
    ) {
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
.sidebar-navigation {
  &.activate {
    background-color: var(--bg-3);
    box-shadow: -4rem 0 2rem rgba(0, 0, 0, 0.03);
  }
}
</style>
