<template>
  <div>
    <div class="flex portrait:flex-col relative pb-24">
      <div class="w-1/2 px-16 py-24 portrait:px-8 portrait:py-8 flex flex-col justify-center portrait:w-full">
        <span class="text-theme-500 text-2xl font-bold mb-4">关于我</span>
        <h2 class="text-5xl portrait:text-2xl font-bold portrait:font-normal">
          玉淇冰-Mebius
        </h2>
        <div class="h-1 w-16 bg-theme-500 my-8"></div>
        <p class="text-lg text-text-2 portrait:text-base mb-4">
          射手座 男 24岁<br>ENFP快乐小狗<br>前端开发者<br>腾讯音乐人<br>业余诗人<br>纯爱战士<br>
        </p>
        <ZyButton class="mt-12">了解更多</ZyButton>
      </div>
      <div class="w-1/2">
        <div
          class="home-section1-image absolute right-36 top-24 portrait:hidden  landscape:h-[28rem] landscape:w-[24rem]">
          <img class="h-full w-full object-cover rounded-4xl" src="@/assets/image/home-section1.jpg" alt="" />
        </div>
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