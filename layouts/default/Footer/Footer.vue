<template>
  <footer h-footer flex justify-center class="zy-footer vertical-layout">
    <div
      h-full
      flex
      w="full xs:[80%] sm:[70%] md:[60%] lg:[50%] xl:[40%]"
      mx-auto
    >
      <zy-link
        v-if="linkList"
        v-for="n in linkList"
        v-zy-ripple
        :to="`${n.path}`"
        h-full
        w="[20%]"
        :title="$t(n.title)"
        justify-center
      >
        <ZyIcon
          size="1.3rem"
          :defaultName="n.defaultIcon"
          defaultColor="var(--text-2)"
          :activatedName="n.activatedIcon"
          :activated="routerActivate(route, n.path)"
          activatedColor="var(--text-1)"
        />
      </zy-link>
    </div>
  </footer>
</template>
<script setup lang="ts">
import {
  getNavigationMapForMenu,
  routerActivate,
} from "@/models/menu/function";

const linkList = getNavigationMapForMenu();
const route = useRoute();
</script>
