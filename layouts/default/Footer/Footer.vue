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
        v-if="linkList"
        v-for="n in linkList"
        :to="`${n.path}`"
        h-full
        w="[20%]"
        :title="$t(n.title)"
        justify-center
      >
        <ZyIcon
          :defaultName="n.defaultIcon"
          defaultColor="var(--text-3)"
          :activatedName="n.activatedIcon"
          :activated="routerActivate(n.path)"
          activatedColor="var(--primary-6)"
        />
      </zy-link>
    </div>
  </footer>
</template>
<script setup lang="ts">
const linkList = getNavigationMap();

const route = useRoute();
const routerActivate = (path: string) => {
  if (path != "/") {
    if (route.path.includes(path)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (route.path == "/") {
      return true;
    }
  }
};
</script>
