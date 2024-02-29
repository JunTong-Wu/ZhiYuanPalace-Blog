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
          :activated="routerActivate(n.path)"
          activatedColor="var(--text-1)"
        />
      </zy-link>
    </div>
  </footer>
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

const getNewLinkList = () => {
  let linkList = getNavigationMap() as Route[];
  for (const route of linkList) {
    if (route.children) {
      route.path = route.children[0].path;
    }
  }
  return linkList;
};
const linkList = getNewLinkList();

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
