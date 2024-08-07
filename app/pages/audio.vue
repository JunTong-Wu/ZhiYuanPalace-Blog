<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "媒体",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-text",
  },
});
definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
const route = useRoute();
const router = useRouter();
</script>
