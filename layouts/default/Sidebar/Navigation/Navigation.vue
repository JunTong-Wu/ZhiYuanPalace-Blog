<template>
  <nav relative>
    <div class="indicator-layer" id="indicator-layer">
      <Indicator :msg="getNavigationMap()" />
    </div>
    <ul>
      <li
        v-for="n in linkList"
        v-zy-ripple
        h-20
        flex
        py-4
        class="sidebar-navigation"
        :class="{ activate: routerActivate(n.path) }"
      >
        <zy-link
          :to="`${n.path}`"
          w-full
          :title="$t(n.title)"
          flex-col
          justify-center
        >
          <div w-7 flex justify-center>
            <ZyIcon
              size="1.5rem"
              :defaultName="n.defaultIcon"
              defaultColor="var(--text-2)"
              :activatedName="n.activatedIcon"
              :activated="routerActivate(n.path)"
              activated-color="var(--text-1)"
            />
          </div>

          <span mt-1 text-xs>{{ $t(n.title) }}</span>
        </zy-link>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import Indicator from "./Indicator/Indicator.vue";

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
<style lang="scss" scoped>
.indicator-layer {
  position: absolute;
  top: 0;
  width: 1rem;
  height: 100%;
}
.sidebar-navigation {
  &.activate {
    /* background-color: var(--bg-card); */
    span {
      color: var(--text-1);
    }
  }
}
</style>
