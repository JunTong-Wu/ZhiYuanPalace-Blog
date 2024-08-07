<template>
  <CommonMainSection>
    TEST
    <Toolbar />
  </CommonMainSection>
</template>
<script setup lang="ts">
useHead({
  title: "音乐",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-photo",
  },
});
definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>
