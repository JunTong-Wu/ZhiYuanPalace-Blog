<template>
  <div mt-header>
    TEST
    <Toolbar absolute top-0 bottom-0 right-0 w-toolbar bg="bg-3" />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "视频",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-video",
  },
});
definePageMeta({
  pageTransition: {
    name: 'first-layer',
    mode: 'out-in'
  },
  middleware: "transition",
});
</script>
