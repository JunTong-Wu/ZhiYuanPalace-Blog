<template>
  <aside
    class="zy-side-bar color-text-1 px-4 overflow-hidden portrait:hidden select-none"
  >
    <Logo class="select-none mb-4" />
    <Avatar class="mb-4" />
    <Navigation />
  </aside>
</template>
<script setup>
import Navigation from "./Navigation/Navigation.vue";
import Avatar from "./Avatar/Avatar.vue";
import Logo from "~/components/layout/Logo/Logo.vue";
// 多语言
const { locale, locales } = useI18n();
</script>
