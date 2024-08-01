<template>
  <aside class="zy-side-bar color-text-1 px-1 overflow-hidden portrait:hidden">
    <Avatar class="mb-8" />
    <Navigation />
  </aside>
</template>
<script setup>
import Navigation from "./Navigation/Navigation.vue";
import Avatar from "./Avatar/Avatar.vue";
// 多语言
const { locale, locales } = useI18n();
</script>
