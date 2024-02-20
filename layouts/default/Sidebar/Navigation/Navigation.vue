<template>
  <nav px-4 relative>
    <div class="indicator-layer" id="indicator-layer">
      <Indicator :msg="getNavigationMap()" />
    </div>
    <ul>
      <li v-for="n in linkList" h-14 flex mb-2>
        <zy-link
          :to="`${n.path}`"
          w-full
          :title="$t(n.title)"
          px-4
          class="sidebar-navigation"
          rounded-lg
          :class="{ activate: routerActivate(n.path) }"
        >
          <div w-7 flex justify-center>
            <ZyIcon
              size="1.25rem"
              :defaultName="n.defaultIcon"
              defaultColor="var(--text-2)"
              :activatedName="n.activatedIcon"
              :activated="routerActivate(n.path)"
              activated-color="var(--text-1)"
            />
          </div>

          <span ml-2 text-sm>{{ $t(n.title) }}</span>
        </zy-link>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import Indicator from "./Indicator/Indicator.vue";

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
<style lang="scss" scoped>
.indicator-layer {
  position: absolute;
  top: 0;
  width: 1rem;
  height: 100%;
}
.sidebar-navigation {
  overflow: hidden;
  > div {
    flex: none;
  }
  > span {
    white-space: nowrap;
  }
  &.activate {
    background-color: var(--bg-2);
  }
}

@media (max-width: 1200px) {
  .sidebar-navigation {
    span {
      display: none;
    }
  }
}
</style>
