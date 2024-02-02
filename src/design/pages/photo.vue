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
    { name: 'description', content: '知书达理，鸢飞鱼跃' }
  ],
  bodyAttrs: {
    class: 'page-photo'
  }
})
</script>