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
const route = useRoute();
const router = useRouter();
</script>
