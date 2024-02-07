<template>
  <div>
    <Header pl-sidebar />
    <main flex-1 pl-sidebar pt-header transition-padding bg="bg-transparent">
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
    <Sidebar class="horizontal-layout" />
  </div>
</template>
<script setup lang="ts">
import Footer from "./default/Footer/Footer.vue";
import Header from "./default/Header/Header.vue";
import Sidebar from "./default/Sidebar/Sidebar.vue";
</script>
<style lang="scss" scoped>
.main-view {
  position: relative;
  top: 100px;
  opacity: 0;
}
.main-view.transition-in {
  top: 0;
  opacity: 1;
  transition: top 200ms;
}
.main-view.transition-out {
  top: 0;
  opacity: 0;
  transition: opacity 100ms;
}
</style>
