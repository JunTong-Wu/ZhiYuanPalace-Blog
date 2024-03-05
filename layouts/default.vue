<template>
  <Sidebar
    fixed
    top-0
    bottom-0
    left-0
    w-sidebar
    z-50
    pt-header
    bg="bg-headerBar"
    backdrop-blur-3xl
  />
  <Header
    fixed
    top-0
    left-0
    right-0
    z-60
    pl-sidebar
    bg="bg-headerBar"
    backdrop-blur-3xl
  />
  <div class="layout-default">
    <main flex-1 pl-sidebar>
      <div text-base relative class="main-view" overflow-hidden>
        <div class="main-view-inner">
          <slot />
        </div>
      </div>
    </main>
  </div>
  <Footer
    fixed
    bottom-0
    left-0
    right-0
    z-60
    bg="bg-headerBar"
    backdrop-blur-3xl
  />
</template>
<script setup lang="ts">
import Header from "./default/Header/Header.vue";
import Sidebar from "./default/Sidebar/Sidebar.vue";
// import Toolbar from "./default/Toolbar/Toolbar.vue";
import Footer from "./default/Footer/Footer.vue";
// import Music from "./default/Music/Music.vue";
</script>
