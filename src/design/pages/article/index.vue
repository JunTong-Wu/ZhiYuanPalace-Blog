<template>
  <div>
    <div w-full h-40 bg="bg-2">
      <zy-link :to="`/${locale}/article/1`" w-full h-full justify-center
        >GO 1</zy-link
      >
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
