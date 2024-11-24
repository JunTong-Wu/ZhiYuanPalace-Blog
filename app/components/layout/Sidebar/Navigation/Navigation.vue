<template>
  <div>
    <nav class="relative">
      <div class="indicator-layer" id="indicator-layer">
        <Indicator :msg="getVisitorNavigationMap()" />
      </div>
      <ul class="flex flex-col gap-2 py-1">
        <li v-for="n in linkList" class="sidebar-navigation h-14 flex hover:bg-background"
          :class="[isActivateRouter(route, n.path) ? 'bg-level-1 an-beat' : '']">
          <ZyLink v-zy-ripple :to="`${n.path}`" :title="$t(n.title)"
            class="w-full flex-col justify-center pl-8 text-text-1">
            <div class="w-full flex items-center gap-4 relative">
              <ZyIcon size="1.75rem" :defaultName="n.defaultIcon" defaultColor="var(&#45;&#45;text-2)"
                :activatedName="n.activatedIcon" :activated="isActivateRouter(route, n.path)"
                activatedColor="var(&#45;&#45;text-1)" />
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
  border-radius: 1rem;

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

.an-beat {
  animation: beat 1s ease-out;
}

@keyframes beat {
  0% {
    transform: translateY(0%) rotate(15deg) scale(0.8);
  }

  25% {
    transform: translateY(-30%);
  }

  50% {
    transform: translateY(10%);
  }

  75% {
    transform: translateY(-20%);
  }

  100% {
    transform: translateY(0%);
  }
}
</style>
