<template>
  <div h-full>
    <div class="bg_decoration">
      <div
        v-for="n in 3"
        :id="`decoration${n}`"
        :style="`background:${bg_color}`"
      >
        &nbsp;
      </div>
    </div>
    <div class="vertical-layout">
      <verticalHeader />
    </div>
    <div flex bg="bg-1">
      <div class="horizontal-layout">
        <horizontalSideBar />
      </div>
      <div flex-1>
        <slot />
      </div>
      <div class="horizontal-layout">
        <horizontalRightBar />
      </div>
    </div>
    <div class="vertical-layout">
      <verticalFooter />
    </div>
  </div>
</template>
<script setup lang="ts">
import verticalHeader from "./default/vertical/Header/Header.vue";
import verticalFooter from "./default/vertical/Footer/Footer.vue";
import horizontalSideBar from "./default/horizontal/SideBar/SideBar.vue";
import horizontalRightBar from "./default/horizontal/RightBar/RightBar.vue";

const bg_color = ref("#00f2ff");
</script>
<style lang="scss" scoped>
@keyframes transform-lr {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(30%);
  }
}
@keyframes transform-rl {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
.bg_decoration {
  filter: blur(200px) brightness(0.8);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.4;
  > div {
    width: 110vmin;
    height: 110vmin;
    border-radius: 50%;
    position: absolute;
    &:first-child {
      top: -45vmin;
      left: -45vmin;
      animation: transform-lr 4s ease-in-out infinite alternate;
    }
    &:nth-of-type(2) {
      top: -60vmin;
      right: -45vmin;
      animation: transform-rl 6s 3s ease-in-out infinite alternate;
    }
    &:nth-of-type(3) {
      bottom: -80vmin;
      right: 20vmin;
      animation: transform-rl 5s 2s ease-in-out infinite alternate;
    }
  }
}
</style>
