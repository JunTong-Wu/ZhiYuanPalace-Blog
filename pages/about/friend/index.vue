<template>
  <div class="pt-main">
    <div class="p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8">TEST</div>
    <Toolbar />
  </div>
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
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>
