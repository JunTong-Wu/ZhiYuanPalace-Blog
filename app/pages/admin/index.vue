<template>
  <div>
    TEST
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
