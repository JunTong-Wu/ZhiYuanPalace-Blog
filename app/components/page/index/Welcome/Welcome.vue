<template>
  <div>
    <div class="flex portrait:flex-col bg-level-1 relative">
      <div class="absolute left-0 bottom-0 opacity-5 text-[5rem] portrait:text-[3rem] text-center text-text-2 font-bold
      sm:text-[10rem]">
        ZHIYUANPALACE
      </div>
      <div
        class="w-1/2 px-16 landscape:py-16 landscape:sm:py-32 portrait:px-8 portrait:py-16 flex flex-col justify-center portrait:w-full portrait:order-2">
        <span class="text-theme-500 landscape:sm:text-2xl font-bold mb-2 landscape:sm:mb-4">嗨！早上好！</span>
        <h2 class="text-3xl landscape:sm:text-5xl font-bold">
          {{ $t("home.welcome") }} <br v-if="!cnClass" /><span class="text-theme-500">{{
            $t("common.zhiYuanPalace")
          }}</span>
        </h2>
        <div class="h-1 w-16 bg-theme-500 my-4 landscape:sm:my-8"></div>
        <p class="text-lg text-text-2 portrait:text-base mb-4">
          {{ $t("home.briefIntroductionContent") }}
        </p>
      </div>
      <div class="w-1/2 portrait:w-full portrait:order-1">
        <div class="home-section1-image
          landscape:relative landscape:-right-8 landscape:-bottom-24 landscape:h-[20rem] landscape:w-[24rem]
          landscape:sm:-bottom-48 landscape:sm:h-[28rem] landscape:sm:w-[34rem]
          portrait:relative portrait:top-0 portrait:w-full portrait:h-[24rem]">
          <img class="h-full w-full object-cover
          rounded sm:rounded-lg md:rounded-2xl lg:rounded-4xl
          portrait:rounded-none" src="@/assets/image/home-section1.jpg" alt="" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 landscape:sm:my-14 p-8 relative z-10
    portrait:p-4 portrait:mt-4 portrait:mb-0">
      <div class="col-span-6 landscape:col-span-3 landscape:sm:col-span-2">
        <TimeKeeping />
      </div>
      <div class="col-span-6 landscape:col-span-3 landscape:sm:col-span-2">
        <Sticker />
      </div>
      <div class="col-span-12 landscape:col-span-6 landscape:sm:col-span-4">
        <Notice />
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
.home-section1-image {
  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("@/assets/image/home-section1.jpg") no-repeat center/cover;
    border-radius: var(--border-radius-4xl) 0 var(--border-radius-4xl) var(--border-radius-4xl);
    filter: blur(1.5rem);
  }

  img {
    position: relative;
    z-index: 2;
  }
}
</style>