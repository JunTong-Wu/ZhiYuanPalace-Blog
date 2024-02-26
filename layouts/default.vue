<template>
  <Logo fixed left-0 top-0 h-header w-sidebar bg="bg-3" z-80 />
  <Sidebar fixed top-0 bottom-0 left-0 w-sidebar top-header bg="bg-3" />
  <Header
    fixed
    top-0
    left-0
    right-0
    z-60
    pl-sidebar
    bg="bg-headerBar"
    backdrop-blur-xl
  />
  <div class="layout-default">
    <main flex-1 pl-sidebar >
      <div
        text-base
        relative
        class="main-view"
        bg="bg-5"
      >
        <slot />
      </div>
    </main>
    <Footer fixed bottom-0 left-0 right-0 z-10 bg="bg-3" />
  </div>
  
</template>
<script setup lang="ts">
import Logo from "./default/Logo/Logo.vue";
import Header from "./default/Header/Header.vue";
import Sidebar from "./default/Sidebar/Sidebar.vue";
// import Toolbar from "./default/Toolbar/Toolbar.vue";
import Footer from "./default/Footer/Footer.vue";
// import Music from "./default/Music/Music.vue";
</script>
