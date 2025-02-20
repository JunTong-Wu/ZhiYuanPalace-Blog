<template>
  <div class="relative bg-level-1 landscape:mt-24 landscape:sm:mt-64">
    <div class="container flex portrait:flex-col relative portrait:mt-0">
      <div class="w-1/2 relative portrait:w-full flex justify-end">
        <div
          class="home-section2-image landscape:relative landscape:-left-8 landscape:-top-16 landscape:h-[20rem] landscape:w-[24rem] landscape:sm:-top-48 landscape:sm:h-[28rem] landscape:sm:w-[34rem] portrait:relative portrait:top-0 portrait:w-full portrait:h-[20rem] portrait:p-4"
        >
          <img
            class="h-full w-full object-cover rounded sm:rounded-lg md:rounded-2xl lg:rounded-4xl"
            src="@/assets/image/home-section2.png"
            alt=""
          />
        </div>
      </div>
      <div
        class="w-1/2 px-16 landscape:py-12 landscape:sm:py-24 landscape:sm:pb-48 portrait:px-8 portrait:py-16 flex flex-col justify-center portrait:w-full"
      >
        <span
          class="text-theme-500 landscape:sm:text-2xl font-bold mb-2 landscape:sm:mb-4"
          >知鸢宫的含义</span
        >
        <h2 class="text-3xl landscape:sm:text-5xl font-bold">
          知书达理，鸢飞鱼跃
        </h2>
        <div class="h-1 w-16 bg-theme-500 my-4 landscape:sm:my-8"></div>
        <p class="text-lg text-text-2 portrait:text-base mb-4">
          {{ $t('home.nameOriginContent') }}
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
  @media (orientation: landscape) {
    .home-section2-image {
      &::after {
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('@/assets/image/home-section2.png') no-repeat
          center/cover;
        border-radius: 0 var(--border-radius-4xl);
        filter: blur(1.5rem);
      }

      img {
        position: relative;
        z-index: 2;
      }
    }
  }
</style>
