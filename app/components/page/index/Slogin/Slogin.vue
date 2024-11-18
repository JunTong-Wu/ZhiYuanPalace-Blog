<template>
  <div class="relative">
    <div class="flex portrait:flex-col bg-level-1 relative mt-64">
      <div class="w-1/2 relative">
        <div class="home-section2-image absolute left-8 -top-48 portrait:hidden landscape:h-[32rem] landscape:w-[38rem]">
          <img class="h-full w-full object-cover rounded-4xl rounded-tl-none rounded-br-none"
            src="@/assets/image/home-section2.png" alt="" />
        </div>
      </div>
      <div class="w-1/2 px-16 py-24 pb-48 portrait:px-8 portrait:py-8 flex flex-col justify-center portrait:w-full">
        <span class="text-theme-500 text-2xl font-bold mb-4">知鸢宫的含义</span>
        <h2 class="text-5xl portrait:text-2xl font-bold portrait:font-normal">
          知书达理，鸢飞鱼跃
        </h2>
        <div class="h-1 w-16 bg-theme-500 my-8"></div>
        <p class="text-lg text-text-2 portrait:text-base mb-4">
          {{ $t("bannerSlogan2") }}
        </p>

      </div>
    </div>
    <!-- logo-slider -->
    <!-- <div class="bg-theme-500 opacity-50 w-full h-16 absolute bottom-0 flex items-center text-white text-3xl font-vivo">
      <div v-for="n in 5" class="inline-block mr-12 -translate-x-16">ZHIYUANPALACE</div>
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
.home-section2-image {
  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("@/assets/image/home-section2.png") no-repeat center/cover;
    border-radius: 0 var(--border-radius-4xl);
    filter: blur(1.5rem);
  }

  img {
    position: relative;
    z-index: 2;
  }
}
</style>