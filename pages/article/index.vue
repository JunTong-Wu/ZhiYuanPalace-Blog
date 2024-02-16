<template>
  <div grid grid-cols-12 gap-4 bg="bg-2" p-4 rounded-3xl>
    <h3 col-span-12 m-0 font-normal>所有文章</h3>
    <zy-store-style-card :href="`/article/${n}`" v-for="n in 3" rounded-lg>
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
