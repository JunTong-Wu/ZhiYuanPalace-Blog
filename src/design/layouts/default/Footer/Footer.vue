<template>
  <footer
    fixed
    bottom-0
    left-0
    right-0
    h-footer
    z-20
    flex
    justify-center
    bg="bg-mask"
    backdrop-blur
  >
    <div
      h-full
      flex
      w="full xs:[80%] sm:[70%] md:[60%] lg:[50%] xl:[40%]"
      mx-auto
    >
      <zy-link
        v-for="n in linkList"
        :to="`/${locale}${n.path}`"
        v-zy-ripple
        h-full
        w="[20%]"
        :title="$t(n.title)"
      >
        <ZyIcon
          :lineName="n.lineIcon"
          lineColor="var(--text-3)"
          :filledName="n.filledIcon"
          :filled="routerActivate(n.path)"
          filled-color="var(--primary-6)"
        />
      </zy-link>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { getMap } from "@/src/core/function/urlTitleMap";

const linkList = getMap();

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
