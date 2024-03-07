<template>
  <nav relative>
    <div class="indicator-layer" id="indicator-layer">
      <Indicator :msg="getNavigationMap()" />
    </div>
    <ul>
      <li v-for="n in linkList" v-zy-ripple h-20 flex class="sidebar-navigation"
        :class="{ activate: routerActivate(route, n.path) }">
        <ZyLink :to="`${n.path}`" w-full py-4 :title="$t(n.title)" flex-col justify-center>
          <div w-7 flex justify-center>
            <ZyIcon size="1.5rem" :defaultName="n.defaultIcon" defaultColor="var(--text-2)"
              :activatedName="n.activatedIcon" :activated="routerActivate(route, n.path)"
              activated-color="var(--text-1)" />
          </div>
          <span text-xs mt-2>{{ $t(n.title) }}</span>
        </ZyLink>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import Indicator from "./Indicator/Indicator.vue";

const linkList = getNavigationMapForMenu();
const route = useRoute();
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
