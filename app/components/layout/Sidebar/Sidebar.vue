<template>
  <aside
    class="zy-side-bar text-text-1 px-4 overflow-hidden portrait:hidden select-none"
  >
    <div class="h-header mb-8"></div>
    <div class="h-music mb-8"></div>
    <Navigation />
  </aside>
</template>
<script setup>
import Navigation from "./Navigation/Navigation.vue";
import Logo from "~/components/layout/Logo/Logo.vue";
// 多语言
const { locale, locales } = useI18n();
</script>
