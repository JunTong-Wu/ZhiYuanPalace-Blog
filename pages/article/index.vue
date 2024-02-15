<template>
  <div grid grid-cols-12 gap-4>
    <zy-store-style-card :href="`/article/${n}`" v-for="n in 10">
      <template #image>
        <img :src="`https://pan.yiru.love/uploads/article/${n}.jpg`" alt="" />
      </template>
      <template #title> GO {{ n }} </template>
    </zy-store-style-card>
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
