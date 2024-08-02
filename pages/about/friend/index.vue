<template>
  <CommonMainSection>
    TEST
    <Toolbar />
  </CommonMainSection>
</template>
<script setup lang="ts">
import CommonMainSection from "~/components/other/CommonMainSection/CommonMainSection.vue";

useHead({
  title: "友链",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-friend",
  },
});
definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>
