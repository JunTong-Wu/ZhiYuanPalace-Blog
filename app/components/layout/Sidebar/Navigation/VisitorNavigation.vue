<template>
  <div>
    <nav class="relative">
      <div class="indicator-layer" id="indicator-layer">
        <Indicator :msg="getVisitorNavigationMap()" />
      </div>
      <ul class="flex flex-col gap-2 py-1">
        <li v-for="item in linkList" class="rounded-xs h-14 flex hover:bg-background"
          :class="[isActivateRootRouter(route, item.path) ? 'bg-level-1 an-beat' : '']">
          <ZyLink v-zy-ripple :to="`${item.path}`" :title="$t(`menu.${String(item.name)}`)"
            class="rounded-xs w-full flex-col justify-center pl-8 text-text-1">
            <div class="w-full flex items-center gap-4 relative">
              <ZyIcon size="1.75rem" :defaultName="item.meta?.defaultIcon" defaultColor="var(&#45;&#45;text-2)"
                :activatedName="item.meta?.activatedIcon" :activated="isActivateRootRouter(route, item.path)"
                activatedColor="var(&#45;&#45;text-1)" />
              <span>{{ $t(`menu.${String(item.name)}`) }}</span>
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
