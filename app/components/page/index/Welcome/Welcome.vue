<template>
  <div>
    <div class="flex portrait:flex-col bg-level-1 relative">
      <div class="absolute left-0 bottom-0 opacity-5 text-[10rem] portrait:text-[3rem] text-center text-text-2 font-bold">
        ZHIYUANPALACE
      </div>
      <div class="w-1/2 px-16 py-24 portrait:px-8 portrait:py-8 flex flex-col justify-center portrait:w-full">
        <span class="text-theme-500 text-2xl font-bold mb-4">嗨！早上好！</span>
        <h2 class="text-5xl portrait:text-2xl font-bold portrait:font-normal">
          {{ $t("welcome") }} <br v-if="!cnClass" /><span class="text-theme">{{
            $t("zhiYuanPalace")
          }}</span>
        </h2>
        <div class="h-1 w-16 bg-theme-500 my-8"></div>
        <p class="text-lg text-text-2 portrait:text-base mb-4">
          {{ $t("bannerSlogan1") }}
        </p>
      </div>
      <div class="absolute -right-32 -bottom-32 portrait:hidden overflow-hidden rounded-4xl">
        <img class="landscape:h-[32rem]" src="@/assets/image/banner.jpg" alt="" />
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 mt-12 p-8">
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
