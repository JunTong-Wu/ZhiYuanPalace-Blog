<template>
  <div>TEST</div>
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
  middleware: "transition",
});
</script>
