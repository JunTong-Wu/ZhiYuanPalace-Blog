<template>
  <Logo />
  <Sidebar w-sidebar top-header class="horizontal-layout" />
  <Toolbar w-toolbar top-header class="horizontal-layout" />
  <div class="layout-default">
    <Header left-sidebar-toolbar />
    <main flex-1 pl-sidebar-toolbar>
      <div text-base relative class="main-view" bg="bg-3" min-h="[100vh]" pt-header>
        <slot />
      </div>
    </main>
    <Footer class="vertical-layout" />
  </div>
</template>
<script setup lang="ts">
import Logo from "./default/Logo/Logo.vue";
import Header from "./default/Header/Header.vue";
import Sidebar from "./default/Sidebar/Sidebar.vue";
import Toolbar from "./default/Toolbar/Toolbar.vue";
import Footer from "./default/Footer/Footer.vue";
// import Music from "./default/Music/Music.vue";
</script>
