<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "关于",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-text",
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
const route = useRoute();
const router = useRouter();
</script>
