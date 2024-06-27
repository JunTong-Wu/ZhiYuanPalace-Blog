<template>
  <div class="pr-toolbar pt-main">
    <div class="p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8">TEST</div>
    <Toolbar class="absolute top-0 bottom-0 right-0 w-toolbar pt-main" />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "相册",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-photo",
  },
});
definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>
