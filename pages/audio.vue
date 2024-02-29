<template>
  <div mt-header>
    TEST
    <Toolbar absolute top-0 bottom-0 right-0 w-toolbar />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "媒体类",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-audio",
  },
});
definePageMeta({
  pageTransition: {
    name: 'first-layer',
    mode: 'out-in'
  },
  middleware: "transition",
  meta: {
    order: 3,
  },
});
</script>
