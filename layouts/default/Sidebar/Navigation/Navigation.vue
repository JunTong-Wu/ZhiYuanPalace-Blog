<template>
  <div>
    <Logo class="fixed left-0 top-0 h-header w-sidebar z-80" />
    <nav class="relative">
      <div class="indicator-layer" id="indicator-layer">
        <Indicator :msg="getNavigationMap()" />
      </div>
      <ul>
        <li
            v-for="n in linkList"

            class="sidebar-navigation h-20 flex"
            :class="{ activate: routerActivate(route, n.path) }"
        >
          <ZyLink
              v-zy-ripple
              :to="`${n.path}`"
              :title="$t(n.title)"
              class="w-full py-4 flex-col justify-center"
          >
            <div class="w-full flex justify-center dark" >
              <img v-if="n.iconImage" :src="`/static/images/icons/${n.iconImage}.png`" :alt="$t(n.title)" class="w-12 h-12" />
            </div>
          </ZyLink>
        </li>
      </ul>
    </nav>
  </div>

</template>
<script setup lang="ts">
import Indicator from "./Indicator/Indicator.vue";
import Logo from "../../Logo/Logo.vue";

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
  padding: 0.25rem;
  a {
    border-radius: 1rem;
    overflow: hidden;

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
