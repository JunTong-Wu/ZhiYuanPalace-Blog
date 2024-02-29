<template>
  <div p="4 xs:5 sm:6 md:7 lg:8" mt-header>
    shuoshuo
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "说说",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-shuoshuo",
  },
});
definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>
