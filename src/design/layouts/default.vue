<template>
  <div h-full>
    <Header />
    <slot />
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Header from "./default/Header/Header.vue";
import Footer from "./default/Footer/Footer.vue";
</script>
