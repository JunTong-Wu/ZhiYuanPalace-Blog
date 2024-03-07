<template>
  <footer h-footer flex justify-center pt-4 class="zy-footer vertical-layout">
    <div h-full flex w="full xs:[80%] sm:[70%] md:[60%] lg:[50%] xl:[40%]" mx-auto>
      <ZyLink v-for="n in linkList" :key="n.title" v-zy-ripple :to="`${n.path}`" h-full w="[20%]" :title="$t(n.title)"
        justify-center>
        <ZyIcon size="1.3rem" :defaultName="n.defaultIcon" defaultColor="var(--text-2)" :activatedName="n.activatedIcon"
          :activated="routerActivate(route, n.path)" activatedColor="var(--text-1)" />
      </ZyLink>
    </div>
  </footer>
</template>
<script setup lang="ts">
const linkList = getNavigationMapForMenu();
const route = useRoute();
</script>
