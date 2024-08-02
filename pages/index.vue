<template>
  <div>
    <div class="root pt-main">
      <div class="p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8">
        <div
            class="grid grid-cols-12 gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8"
        >
          <div class="col-span-12">
            <div class="flex portrait:flex-col bg-bg-bestCard rounded-2xl rounded-tr-[4rem] rounded-bl-[4rem] relative overflow-hidden">
              <div class="absolute left-0 bottom-0 opacity-5 text-[10rem] portrait:text-[3rem] text-center text-text-2 font-bold">ZHIYUANPALACE</div>
              <div class="w-1/2 px-16 py-24 portrait:px-8 portrait:py-8 flex flex-col justify-center portrait:w-full">
                <h2 class="text-5xl portrait:text-2xl font-bold portrait:font-normal mb-8">欢迎访问 <span class="text-theme">知鸢宫</span></h2>
                <p class="text-lg text-text-2 portrait:text-base mb-4">『知鸢宫』是我的个人博客，用来存放原创文章、网络文案、照片等回忆。愿有岁月可回首，且以深情共白头。</p>
                <p class="text-lg text-text-2 portrait:text-base mb-4 portrait:hidden">『知鸢宫』取自成语『知书达理，鸢飞鱼跃』。须是操存涵养，定云止水中，有鸢飞鱼跃的景象，风狂雨骤处，有波恬浪静的风光，才见处一化齐之妙。</p>
              </div>
              <div class="absolute -right-32 -bottom-24 portrait:hidden">
                <img class="landscape:h-[32rem]" src="@/assets/image/banner.png" alt="">
              </div>
            </div>
          </div>
          <div class="col-span-12"></div>
        </div>
      </div>
      <Toolbar />
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>
