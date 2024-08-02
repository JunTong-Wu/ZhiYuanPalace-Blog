<template>
  <div class="flex portrait:flex-col bg-bg-bestCard rounded-3xl rounded-tr-[4rem] rounded-bl-[4rem] relative overflow-hidden">
    <div class="absolute left-0 bottom-0 opacity-5 text-[10rem] portrait:text-[3rem] text-center text-text-2 font-bold">ZHIYUANPALACE</div>
    <div class="w-1/2 px-16 py-24 portrait:px-8 portrait:py-8 flex flex-col justify-center portrait:w-full">
      <h2 class="text-5xl portrait:text-2xl font-bold portrait:font-normal mb-8 font-vivo">{{ $t("welcome") }} <br v-if="!cnClass" /><span class="text-theme">{{ $t("zhiYuanPalace") }}</span></h2>
      <p class="text-lg text-text-2 portrait:text-base mb-4">{{ $t("bannerSlogan1") }}</p>
      <p class="text-lg text-text-2 portrait:text-base mb-4 portrait:hidden">{{ $t("bannerSlogan2") }}</p>
    </div>
    <div class="absolute -right-32 -bottom-24 portrait:hidden">
      <img class="landscape:h-[32rem]" src="@/assets/image/banner.png" alt="">
    </div>
  </div>
</template>
<script lang="ts" setup>
const { locale } = useI18n();
const cnClass = computed(() => {
  return locale.value.includes("zh-CN");
});
</script>