<template>
  <div>
    <div>文字类</div>
    <zy-router-tab :children="children">
      <template v-slot:key-article><ArticlePage /></template>
      <template v-slot:key-shuoshuo><ShuoshuoPage /></template>
    </zy-router-tab>
  </div>
</template>
<script setup lang="ts">
import ArticlePage from "../views/text/article/index.vue";
import ShuoshuoPage from "../views/text/shuoshuo/index.vue";

definePageMeta({
  alias: ["/article", "/shuoshuo"],
});
const children = [
  { name: "文章", key: "article", path: "/article" },
  { name: "说说", key: "shuoshuo", path: "/shuoshuo" },
];
</script>
