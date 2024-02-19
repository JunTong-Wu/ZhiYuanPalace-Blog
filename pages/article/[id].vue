<template>
  <div>
    <div
      class="zy-store-style-card transition-in"
      fixed
      inset-0
      l-sidebar
      r-toolbar
      bg="bg-3"
      overflow-y-auto
      overflow-x-hidden
      pb-50
      z-20
    >
      <div class="zy-store-style-card-inner">
        <div class="zy-card-image">
          <img
            :src="`https://pan.yiru.love/uploads/article/${id}.jpg`"
            alt=""
          />
        </div>
      </div>
      <div class="zy-store-style-card-text" p-4>
        <h1>Title</h1>
        <p>
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text
        </p>
        <p>
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text
        </p>
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
