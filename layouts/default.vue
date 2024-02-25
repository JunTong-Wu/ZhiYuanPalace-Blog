<template>
  <Logo w-sidebar />
  <Sidebar w-sidebar top-header class="horizontal-layout" />
  <Header left-sidebar/>
  <div class="layout-default">
    <main flex-1 pl-sidebar pr-toolbar>
      <div text-base relative class="main-view" bg="bg-5" min-h="[100vh]" pt-header>
        <slot />
      </div>
    </main>
    <Footer class="vertical-layout" />
  </div>
  <Toolbar w-toolbar pt-header class="horizontal-layout" />
</template>
<script setup lang="ts">
import Logo from "./default/Logo/Logo.vue";
import Header from "./default/Header/Header.vue";
import Sidebar from "./default/Sidebar/Sidebar.vue";
import Toolbar from "./default/Toolbar/Toolbar.vue";
import Footer from "./default/Footer/Footer.vue";
// import Music from "./default/Music/Music.vue";
</script>
