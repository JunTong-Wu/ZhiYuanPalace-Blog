<template>
  <aside class="zy-side-bar color-text-1 overflow-hidden portrait:hidden">
    <Navigation />
  </aside>
</template>
<script setup>
import Navigation from "./Navigation/Navigation.vue";
// 多语言
const { locale, locales } = useI18n();
</script>
