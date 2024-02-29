<template>
  <div absolute left-0 right-0 top-header-tabs p="4 xs:5 sm:6 md:7 lg:8">
    shuoshuo
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "说说",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-shuoshuo",
  },
});
definePageMeta({
  pageTransition: {
    name: "first-layer",
    mode: "out-in",
  },
  middleware: "transition",
  meta: {
    order: 2,
  },
});
</script>
