<template>
  <div
    class="zy-store-style-card transition"
    fixed
    inset-0
    pl-sidebar
    bg="bg-3"
    z-20
  >
    <div class="zy-store-style-card-inner">
      <div class="zy-card-image">
        <img :src="`https://pan.yiru.love/uploads/article/${id}.jpg`" alt="" />
        <div class="zy-card-title">
          <p>GO {{ id }}</p>
        </div>
      </div>
    </div>
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
const route = useRoute();
const id = route.params.id;

// if (process.client) {
//   const header = document.querySelector("header");
//   if (header) {
//     header.classList.add("dark");
//   }
// }
onMounted(() => {});
</script>
