<template>
  <CommonMainSection>
    admin
  </CommonMainSection>
</template>
<script setup lang="ts">
useHead({
  title: "仪表盘",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-admin",
  },
});
definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: ["transition", "auth"]
});
</script>
