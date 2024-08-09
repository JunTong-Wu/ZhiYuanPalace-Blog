<template>
  <aside
    class="zy-side-bar color-text-1 px-4 overflow-hidden portrait:hidden select-none"
  >
    <Logo class="select-none mb-8" />
<!--    <Avatar class="mb-8" />-->
    <div class="h-music mb-8"></div>
    <div class="px-8">
      <div class="border-b border-borderColor mb-4"></div>
    </div>
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
