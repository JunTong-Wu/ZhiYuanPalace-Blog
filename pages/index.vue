<template>
  <div>
    <div class="root pt-main">
      <div class="p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8">
        <div class="container flex py-8 portrait:flex-col">
          <div class="w-1/2 p-8 flex flex-col justify-center portrait:order-1 portrait:w-full portrait:items-center">
            <h2 class="text-5xl portrait:text-2xl font-bold portrait:font-normal mb-8">欢迎访问知鸢宫</h2>
            <p class="text-lg text-text-2 portrait:text-base mb-4">『知鸢宫』是我的个人博客，用来存放原创文章、网络文案、照片等回忆。愿有岁月可回首，且以深情共白头。</p>
            <p class="text-lg text-text-2 portrait:text-base mb-4">『知鸢宫』取自成语『知书达理，鸢飞鱼跃』。须是操存涵养，定云止水中，有鸢飞鱼跃的景象，风狂雨骤处，有波恬浪静的风光，才见处一化齐之妙。</p>
          </div>
          <div class="w-1/2 portrait:mx-auto">
            <img src="@/assets/image/LooperGroup.png" alt="">
          </div>
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
