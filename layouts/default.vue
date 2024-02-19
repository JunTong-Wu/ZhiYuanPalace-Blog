<template>
  <div class="layout-default">
    <Header pl-sidebar />
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
        overflow-auto
        scroll-view
        class="main-view transition-in"
        p-4
      >
        <slot />
      </div>
    </main>
    <Footer class="vertical-layout" />
    <Sidebar w-sidebar class="horizontal-layout" />
    <Toolbar w-toolbar pt-header class="horizontal-layout" />
  </div>
</template>
<script setup lang="ts">
import Footer from "./default/Footer/Footer.vue";
import Header from "./default/Header/Header.vue";
import Sidebar from "./default/Sidebar/Sidebar.vue";
import Toolbar from "./default/Toolbar/Toolbar.vue";
</script>
