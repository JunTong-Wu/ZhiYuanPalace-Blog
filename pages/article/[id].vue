<template>
  <div>
    <div>ARTICLE TEST</div>
    <zy-Link :to="`/`">Go Home</zy-Link>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "文章详情",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-article-details",
  },
});
definePageMeta({
  middleware: "transition",
});
</script>
