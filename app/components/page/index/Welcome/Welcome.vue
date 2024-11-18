<template>
  <div>
    <div class="flex portrait:flex-col bg-level-1 relative">
      <div class="absolute left-0 bottom-0 opacity-5 text-[10rem] portrait:text-[3rem] text-center text-text-2 font-bold">
        ZHIYUANPALACE
      </div>
      <div class="w-1/2 px-16 py-32 portrait:px-8 portrait:py-8 flex flex-col justify-center portrait:w-full">
        <span class="text-theme-500 text-2xl font-bold mb-4">嗨！早上好！</span>
        <h2 class="text-5xl portrait:text-2xl font-bold portrait:font-normal">
          {{ $t("welcome") }} <br v-if="!cnClass" /><span class="text-theme-500">{{
            $t("zhiYuanPalace")
          }}</span>
        </h2>
        <div class="h-1 w-16 bg-theme-500 my-8"></div>
        <p class="text-lg text-text-2 portrait:text-base mb-4">
          {{ $t("bannerSlogan1") }}
        </p>
      </div>
      <div class="w-1/2">
        <div
          class="home-section1-image absolute right-8 -bottom-48 portrait:hidden  landscape:h-[32rem] landscape:w-[38rem]">
          <img class="h-full w-full object-cover rounded-4xl rounded-tr-none" src="@/assets/image/home-section1.jpg"
            alt="" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 my-24 p-8 relative z-10">
      <div class="col-span-6 landscape:col-span-2">
        <TimeKeeping />
      </div>
      <div class="col-span-6 landscape:col-span-2">
        <Sticker />
      </div>
      <div class="col-span-12 landscape:col-span-4">
        <Notice />
      </div>

    </div>
  </div>
</template>
<script lang="ts" setup>
const { locale } = useI18n();
const cnClass = computed(() => {
  return locale.value.includes("zh-CN");
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
    border-radius: var(--border-radius-4xl) 0;
    filter: blur(1.5rem);
  }

  img {
    position: relative;
    z-index: 2;
  }
}
</style>