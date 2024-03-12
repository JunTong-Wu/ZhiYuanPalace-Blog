<template>
  <aside color="text-1" overflow-hidden portrait:hidden class="zy-side-bar">
    <Navigation />
  </aside>
</template>
<script setup>
import Navigation from "./Navigation/Navigation.vue";
// 多语言
const { locale, locales } = useI18n();
</script>
