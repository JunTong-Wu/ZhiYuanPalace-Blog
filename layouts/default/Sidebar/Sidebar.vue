<template>
  <aside color="text-1" overflow-hidden class="zy-side-bar horizontal-layout">
    <Navigation mt-10/>
  </aside>
</template>
<script setup>
import Navigation from "./Navigation/Navigation.vue";
// 多语言
const { locale, locales } = useI18n();
</script>
