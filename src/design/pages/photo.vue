<template>
  <div>
    <div bg="bg-1" w-full h-header></div>
    <copyrightFooter></copyrightFooter>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: '照片',
  meta: [
    { name: 'description', content: '我的神奇网站。' }
  ],
  bodyAttrs: {
    class: 'page-photo'
  }
})
</script>