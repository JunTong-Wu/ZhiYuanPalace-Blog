<template>
  <CommonMainSection>
    <button @click="showAlert">Show Alert</button>
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
  window.ZyAlert({
    title: "提示",
    text: "这是一个提示信息",
  });
}
</script>
