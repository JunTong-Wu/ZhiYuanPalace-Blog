<template>
  <CommonMainSection>
    admin
  </CommonMainSection>
</template>
<script setup lang="ts">
useHead({
  title: "登录",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-login",
  },
});
definePageMeta({
  layout: "admin",
  layoutTransition: {
    mode: "out-in",
  },
  pageTransition: {
    mode: "out-in",
  },
  middleware: ["transition", "auth"]
});
</script>
