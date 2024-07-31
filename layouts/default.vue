<template>
  <div class="">
    <Sidebar
        class="fixed top-0 bottom-0 left-0 w-sidebar z-30 pt-main bg-bg-sideBar text-white"
    />
    <div
        class="w-sidebar h-full fixed z-30 top-0 left-0  portrait:hidden pointer-events-none"
    >
<!--      <div class="absolute right-0 h-full w-10 bg-gradient-to-l from-themeColorTranslucent to-musicBar opacity-30"></div>-->
    </div>
    <Header class="fixed top-0 left-sidebar right-0 z-40 landscape:backdrop-blur-3xl landscape:bg-bg-headBar portrait:bg-bg-opaque" />
    <div class="layout-default relative z-20">
      <main class="flex-1 pl-sidebar">
        <div class="main-view text-base relative overflow-hidden">
          <div class="main-view-inner">
            <slot />
          </div>
        </div>
      </main>
    </div>

    <Music
        class="fixed top-music landscape:right-8 w-music z-50 portrait:bg-bg-opaque landscape:rounded-2xl overflow-hidden landscape:shadow-sm"
    />
    <Footer class="fixed z-40 bottom-0 left-0 right-0 z-60 bg-bg-opaque" />

  </div>
</template>
<script setup lang="ts">
import Header from "./default/Header/Header.vue";
import Sidebar from "./default/Sidebar/Sidebar.vue";
import Footer from "./default/Footer/Footer.vue";
import Music from "./default/Music/Music.vue";
</script>
