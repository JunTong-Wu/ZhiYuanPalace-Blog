<template>
  <CommonMainSection>
    TEST
    <Toolbar />
  </CommonMainSection>
</template>
<script setup lang="ts">
useHead({
  title: "友链",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-friend",
  },
});
definePageMeta({
  layout: "default",
  layoutTransition: {
    mode: "out-in",
  },
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>
