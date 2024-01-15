<template>
  <div h-full bg="bg-1">
    <div>
      <Header />
      <!-- <SideBar class="horizontal-layout" /> -->
      <main flex-1 bg="bg-transparent">
        <slot />
      </main>
      <!-- <RightBar class="horizontal-layout" /> -->
      <Footer class="vertical-layout" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Footer from "./default/Footer/Footer.vue";
import Header from "./default/Header/Header.vue";
import SideBar from "./default/SideBar/SideBar.vue";
import RightBar from "./default/RightBar/RightBar.vue";
</script>
