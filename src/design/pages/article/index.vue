<template>
  <div>
    <div w-full h-40 bg="bg-2">
      <zy-store-style-card>GO 1</zy-store-style-card>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "文章",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-article",
  },
});
const { locale } = useI18n();
</script>
