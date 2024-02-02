<template>
  <div>
    <div bg="bg-1" w-full h-header></div>
    <copyrightFooter></copyrightFooter>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: '视频',
  meta: [
    { name: 'description', content: '知书达理，鸢飞鱼跃' }
  ],
  bodyAttrs: {
    class: 'page-video'
  }
})
</script>