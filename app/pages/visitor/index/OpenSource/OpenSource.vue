<template>
  <div
    class="container py-16 px-4 landscape:sm:py-24 landscape:px-16 landscape:sm:px-24"
  >
    <div class="flex flex-col justify-center items-center">
      <span
        class="text-theme-500 dark:text-theme-100 landscape:sm:text-2xl font-bold mb-2 landscape:sm:mb-4"
        >开源</span
      >
      <h2 class="text-2xl landscape:sm:text-4xl font-bold">知鸢宫开放源代码</h2>
      <div
        class="h-1 w-16 bg-theme-500 dark:bg-theme-100 my-4 landscape:sm:my-8"
      ></div>
      <p class="text-lg text-text-2 portrait:text-sm mb-4 text-center">
        『知鸢宫』使用 NUXT3 框架全栈开发，使用腾讯云全家桶部署。<br />
        『知鸢宫』遵循 MIT 协议开源全部代码，开放 API
        接口，回馈开源社区，欢迎大家围观学习。<br />
        开源系统同样也有版权，同样也受到法律保护。
      </p>
      <div
        class="flex gap-4 justify-center items-center pb-16 landscape:sm:pb-24"
      >
        <ZyLink :to="'/doc'">
          <ZyButton
            class="mt-12"
            size="large"
            >开发文档</ZyButton
          >
        </ZyLink>
        <ZyLink :to="'#'">
          <ZyButton
            type="linear"
            class="mt-12"
            size="large"
            >开源地址</ZyButton
          >
        </ZyLink>
      </div>
      <Marquee />
    </div>
  </div>
</template>
<script setup>
  import Marquee from "./Marquee/Marquee.vue";
</script>
