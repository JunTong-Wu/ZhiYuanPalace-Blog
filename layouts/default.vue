<template>
  <Sidebar
    class="fixed top-0 bottom-0 left-0 w-sidebar z-50 pt-main bg-bg-opaque"
  />
  <Header class="fixed top-0 left-0 right-0 z-60 pl-sidebar bg-bg-opaque" />
  <div class="layout-default">
    <main class="flex-1 pl-sidebar">
      <div class="main-view text-base relative overflow-hidden">
        <div class="main-view-inner">
          <slot />
        </div>
      </div>
    </main>
  </div>
  <Music
    class="fixed top-music left-0 right-0 w-music mx-auto z-70 landscape:bg-bg-card portrait:bg-bg-opaque landscape:rounded-full landscape:shadow-sm"
  />
  <Footer class="fixed bottom-0 left-0 right-0 z-60 bg-bg-opaque" />
</template>
<script setup lang="ts">
import Header from "./default/Header/Header.vue";
import Sidebar from "./default/Sidebar/Sidebar.vue";
// import Toolbar from "./default/Toolbar/Toolbar.vue";
import Footer from "./default/Footer/Footer.vue";
import Music from "./default/Music/Music.vue";
</script>
