<template>
  <Header />
  <main flex-1 bg="bg-transparent">
    <div
        text-base
        h="[100vh]"
        overflow-auto
        scroll-view
        class="main-scroll"
    >
      <NuxtPage mx-auto />
      <div h-footer></div>
    </div>
  </main>
  <Footer class="vertical-layout" />
</template>
<script setup lang="ts">
import Footer from "./default/Footer/Footer.vue";
import Header from "./default/Header/Header.vue";
</script>
