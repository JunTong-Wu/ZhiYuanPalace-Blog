<template>
  <div>
    <ZyBanner></ZyBanner>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: '主页',
  meta: [
    { name: 'description', content: '我的神奇网站。' }
  ],
  bodyAttrs: {
    class: 'page-home'
  }
})
</script>