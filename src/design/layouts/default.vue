<template>
  <Header pl-sidebar />
  <main flex-1 pl-sidebar pt-header transition-all bg="bg-transparent">
    <slot />
  </main>
  <Footer class="vertical-layout" />
  <Sidebar class="horizontal-layout" />
</template>
<script setup lang="ts">
import Footer from "./default/Footer/Footer.vue";
import Header from "./default/Header/Header.vue";
import Sidebar from "./default/Sidebar/Sidebar.vue";
</script>
