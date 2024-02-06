<template>
  <div>
    <div>ARTICLE TEST</div>
    <zy-Link :to="`/${locale}`">Go Home</zy-Link>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "article",
});
// 多语言
const { locale } = useI18n();
</script>
