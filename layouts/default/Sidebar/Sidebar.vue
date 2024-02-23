<template>
  <aside
    fixed
    top-0
    bottom-0
    left-0
    bg="bg-1"
    color="text-1"
    overflow-hidden
    class="zy-side-bar"
  >
    <Navigation />
  </aside>
</template>
<script setup>
import Navigation from "./Navigation/Navigation.vue";
// 多语言
const { locale, locales } = useI18n();
</script>
