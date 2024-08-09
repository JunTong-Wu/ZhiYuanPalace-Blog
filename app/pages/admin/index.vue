<template>
  <div>
    <div class="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center">
      <div class="bg-bg-bestCard p-8 rounded-2xl min-w-[20rem] flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold text-center mb-4">登录知鸢宫</h1>

        <div class="w-full flex flex-col items-center">
          登录页暂未开发，敬请期待
        </div>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
useHead({
  title: "登录",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-login",
  },
});
definePageMeta({
  layout: 'simple',
  layoutTransition: {
    mode: "out-in",
  },
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>
