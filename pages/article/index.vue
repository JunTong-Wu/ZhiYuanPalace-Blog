<template>
  <div>
    <div w-60 h-40 mb-4 v-for="n in 3">
      <zy-store-style-card :href="`/article/${n}`">
        <template #image>
          <img :src="`https://pan.yiru.love/uploads/article/${n}.jpg`" alt="" />
        </template>
        <template #title> GO {{ n }} </template>
      </zy-store-style-card>
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
definePageMeta({
  middleware: "transition",
});
</script>
