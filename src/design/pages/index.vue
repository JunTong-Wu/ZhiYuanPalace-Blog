<template>
  <div>
    <Hero></Hero>
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
<style lang="scss">
.page-home {
  background-image: url('@/src/assets/image/gradient.jpg');
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.dark .page-home {
  background-image: url('@/src/assets/image/gradient_dark.jpg');
  background-repeat: no-repeat;
  background-size: 100% auto;
}
</style>