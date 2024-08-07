<template>
  <div>
    <nav class="relative">
      <div class="indicator-layer" id="indicator-layer">
        <Indicator :msg="getNavigationMap()" />
      </div>
      <ul>
        <li
            v-for="n in linkList"

            class="sidebar-navigation h-24 flex py-2"
            :class="{ activate: routerActivate(route, n.path) }"
        >
          <ZyLink
              v-zy-ripple
              :to="`${n.path}`"
              :title="$t(n.title)"
              class="w-full flex-col justify-center"
          >
            <div class="w-full flex justify-center dark relative" >
              <img v-if="n.iconImage" :src="`/static/images/icons/${n.iconImage}.png`" :alt="$t(n.title)" class="w-10 h-10" />
              <span class="absolute -bottom-5 text-xs">{{ $t(n.title) }}</span>
            </div>
          </ZyLink>
        </li>
      </ul>
    </nav>
  </div>

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
