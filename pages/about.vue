<template>
  <div pr-toolbar pt-main>
    <div p="4 xs:5 sm:6 md:7 lg:8">TEST</div>
    <Toolbar absolute top-0 bottom-0 right-0 w-toolbar pt-main />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "关于我",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-video",
  },
});
definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>
