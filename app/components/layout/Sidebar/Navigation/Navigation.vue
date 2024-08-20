<template>
  <div>
    <nav class="relative">
      <div class="indicator-layer" id="indicator-layer">
        <Indicator :msg="getVisitorNavigationMap()" />
      </div>
      <ul class="flex flex-col gap-2">
        <li
          v-for="n in linkList"
          class="sidebar-navigation h-16 flex"
          :class="{ activate: routerActivate(route, n.path) }"
        >
          <ZyLink
            v-zy-ripple
            :to="`${n.path}`"
            :title="$t(n.title)"
            class="w-full flex-col justify-center pl-8 text-text-1"
          >
            <div class="w-full flex items-center gap-4 relative">
<!--              <img-->
<!--                v-if="n.iconImage"-->
<!--                :src="`/static/images/icons/${n.iconImage}.png`"-->
<!--                :alt="$t(n.title)"-->
<!--                class="w-10 h-10 rounded-full overflow-hidden"-->
<!--              />-->
              <ZyIcon
                  size="1.5rem"
                  :defaultName="n.defaultIcon"
                  defaultColor="var(--text-2)"
                  :activatedName="n.activatedIcon"
                  :activated="routerActivate(route, n.path)"
                  activatedColor="var(--text-1)"
              />
              <span>{{ $t(n.title) }}</span>
            </div>
          </ZyLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
import Indicator from "./Indicator/Indicator.vue";

const linkList = getNavigationMapForVisitorMenu();
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
    border-radius: 1rem;
    background-color: var(--bg-best-card);
  }
  a {
    border-radius: 1rem;

    img {
      transition: all 0.1s ease-in-out;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
}
</style>
