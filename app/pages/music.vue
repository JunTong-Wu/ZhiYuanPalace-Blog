<template>
  <CommonMainSection>
    <button @click="showAlert">{{ test }}</button>
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
  layout: "default",
  layoutTransition: {
    mode: "out-in",
  },
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
function showAlert() {
  window.ZyToast({
    title: "提示",
    text: "这是一个提示信息",
  });
}
const config = useRuntimeConfig()
const test = config.public.DB_USER + "@" + config.public.DB_HOST + ":" + config.public.DB_PORT + ", " + config.public.DB_PASSWORD
</script>
