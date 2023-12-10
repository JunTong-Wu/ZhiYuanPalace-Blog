<template>
  <div h-full>
    <div class="bg_decoration">
      <div v-for="n in 4" :id="`decoration-${n}`">&nbsp;</div>
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  > div {
    filter: blur(200px);
    border-radius: 50%;
    position: absolute;
    z-index: -1;
    opacity: 0.4;
    &:first-child {
      width: 70vmin;
      height: 70vmin;
      top: -35vmin;
      left: -35vmin;
      background-color: #00ffbf;
      animation: transform-lr 3s ease-in-out infinite alternate;
    }
    &:nth-of-type(2) {
      width: 100vmin;
      height: 100vmin;
      bottom: -50vmin;
      right: -50vmin;
      background-color: #ff6f00;
      animation: transform-rl 3s ease-in-out infinite alternate;
    }
    &:nth-of-type(3) {
      width: 50vmin;
      height: 50vmin;
      bottom: -10vmin;
      right: 90vmin;
      background-color: #7300ff;
      animation: transform-lr 5s 1s ease-in-out infinite alternate;
    }
    &:nth-of-type(4) {
      width: 50vmin;
      height: 50vmin;
      top: 10vmin;
      right: 10vmin;
      background-color: #ff000d;
      animation: transform-rl 5s 1s ease-in-out infinite alternate;
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(@/src/assets/image/noise.png);
    opacity: 0.03;
  }
}
</style>
