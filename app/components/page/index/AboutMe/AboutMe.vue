<template>
  <div>
    <div class="flex portrait:flex-col relative landscape:sm:pb-12 container">
      <div
        class="w-1/2 px-16 landscape:py-16 landscape:sm:py-32 portrait:px-8 portrait:py-16 flex flex-col justify-center portrait:w-full portrait:order-2">
        <span class="text-theme-500 landscape:sm:text-2xl font-bold mb-2 landscape:sm:mb-4">关于我</span>
        <h2 class="text-3xl landscape:sm:text-5xl font-bold">
          玉淇冰-Mebius
        </h2>
        <div class="h-1 w-16 bg-theme-500 my-4 landscape:sm:my-8"></div>
        <p class="text-lg text-text-2 portrait:text-base mb-4">
          射手座 男 24岁<br>ENFP快乐小狗<br>前端开发者<br>腾讯音乐人<br>业余诗人<br>纯爱战士<br>
        </p>
        <ZyButton class="mt-12" @click="$router.push('/about/information')">了解更多</ZyButton>
      </div>
      <div class="w-1/2 portrait:w-full">
        <div class="home-section3-image
        landscape:relative landscape:left-16 landscape:top-24 landscape:h-[22rem] landscape:w-[18rem]
        landscape:sm:h-[28rem] landscape:sm:w-[24rem]
        portrait:relative portrait:top-0 portrait:w-full portrait:h-[20rem] portrait:p-4">
          <img class="h-full w-full object-cover
          rounded sm:rounded-lg md:rounded-2xl lg:rounded-4xl" src="@/assets/image/home-section1.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const { locale } = useI18n();
const cnClass = computed(() => {
  return locale.value.includes("zh");
});
</script>
<style lang="scss" scoped>
@media (orientation: landscape) {
  .home-section3-image {
    &::after {
      content: "";
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("@/assets/image/home-section1.jpg") no-repeat center/cover;
      border-radius: var(--border-radius-4xl) 0;
      filter: blur(1.5rem);
    }

    img {
      position: relative;
      z-index: 2;
    }
  }
}
</style>