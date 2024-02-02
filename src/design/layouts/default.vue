<template>
  <Header />
  <main flex-1 bg="bg-transparent">
    <slot />
  </main>
  <Footer class="vertical-layout" />
</template>
<script setup lang="ts">
import Footer from "./default/Footer/Footer.vue";
import Header from "./default/Header/Header.vue";
</script>
