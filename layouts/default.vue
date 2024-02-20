<template>
  <div class="layout-default">
    <Header l-sidebar r-toolbar/>
    <main
      flex-1
      pl-sidebar
      pr-toolbar
      pt-header
      transition-padding
      bg="bg-transparent"
    >
      <div
        text-base
        relative
        class="main-view"
      >
        <slot />
      </div>
    </main>
    <Footer class="vertical-layout" />
    <Sidebar w-sidebar class="horizontal-layout" />
    <Toolbar w-toolbar  class="horizontal-layout" />
    <!-- <Music /> -->
  </div>
</template>
<script setup lang="ts">
import Footer from "./default/Footer/Footer.vue";
import Header from "./default/Header/Header.vue";
import Sidebar from "./default/Sidebar/Sidebar.vue";
import Toolbar from "./default/Toolbar/Toolbar.vue";
// import Music from "./default/Music/Music.vue";
</script>
