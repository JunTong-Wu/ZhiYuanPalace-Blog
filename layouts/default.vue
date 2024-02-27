<template>
  <Logo fixed left-0 top-0 h-header w-sidebar  z-80 />
  <Sidebar fixed top-0 bottom-0 left-0 w-sidebar top-header />
  <Header
    fixed
    top-0
    left-0
    right-0
    z-60
    pl-sidebar
    class="background-img"
  />
  <div class="layout-default">
    <main flex-1 pl-sidebar >
      <div
        text-base
        relative
        class="main-view"
        pr-toolbar
      >
        <slot />
      </div>
    </main>
  </div>
  <Footer fixed bottom-0 left-0 right-0 z-60 class="background-img"/>
</template>
<script setup lang="ts">
import Logo from "./default/Logo/Logo.vue";
import Header from "./default/Header/Header.vue";
import Sidebar from "./default/Sidebar/Sidebar.vue";
// import Toolbar from "./default/Toolbar/Toolbar.vue";
import Footer from "./default/Footer/Footer.vue";
// import Music from "./default/Music/Music.vue";
</script>
