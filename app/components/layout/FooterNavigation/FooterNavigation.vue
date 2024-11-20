<template>
  <footer class="zy-footer-navigation h-footer flex justify-center landscape:hidden">
    <div class="h-full flex mx-auto w-full xs:w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
      <ZyLink v-for="n in linkList" :key="n.title" v-zy-ripple :to="`${n.path}`" :title="$t(n.title)"
        class="h-full justify-center w-[20%]">
        <ZyIcon size="1.3rem" :defaultName="n.defaultIcon" defaultColor="var(--text-1)" :activatedName="n.activatedIcon"
          :activated="routerActivate(route, n.path)" activatedColor="var(--text-1)" />
      </ZyLink>
    </div>
  </footer>
</template>
<script setup lang="ts">
import "./transition.scss";
const linkList = getNavigationMapForVisitorMenu();
const route = useRoute();
</script>
