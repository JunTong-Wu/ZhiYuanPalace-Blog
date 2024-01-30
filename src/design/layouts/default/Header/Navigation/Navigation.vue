<template>
  <nav class="zy-navigation">
    <ul class="flex h-full items-center">
      <li h-full v-for="n in linkList">
        <zy-link
          :to="`/${locale}${n.path}`"
          h-full
          px-5
          :title="$t(n.title)"
          :class="{ activate: routerActivate(n.path) }"
        >
          {{ $t(n.title) }}
        </zy-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {getMap} from "@/src/core/function/urlTitleMap"

const linkList = getMap()

const route = useRoute();
const localePath = useLocalePath();
const { locale } = useI18n();
const routerActivate = (path: string) => {
  if (path != "/") {
    if (route.path.includes(path)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (route.path == "/" || route.path == `/${locale.value}` || route.path == `/${locale.value}/`) {
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes an-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.zy-navigation {
  animation: an-fade-in 0.7s;
}

.activate {
  color: var(--primary-6);
}
</style>
