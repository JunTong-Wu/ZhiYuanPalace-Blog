<template>
  <div id="layout-default" class="relative overflow-hidden">
    <Sidebar class="fixed top-header bottom-0 left-0 w-sidebar z-40 bg-level-1" />
    <Header class="fixed top-0 z-40 h-header w-full" />
    <div id="layout-default-main" class="layout-default-main relative z-10 mr-toolbar">
      <main class="flex-1 pl-sidebar">
        <div class="main-view text-base relative overflow-hidden">
          <div class="main-view-inner">
            <slot />
          </div>
        </div>
      </main>
    </div>
    <aside id="zy-tool-bar"
      class="zy-tool-bar portrait:hidden fixed top-header bottom-0 right-0 w-toolbar bg-level-1 border border-y-0 border-r-0 border-borderColor">
    </aside>
    <Music
      class="fixed top-music landscape:left-4 w-music z-50 portrait:bg-headBar backdrop-blur-3xl landscape:shadow-sm" />
    <FooterColumns />
    <FooterNavigation class="fixed z-40 bottom-0 left-0 right-0 z-60 bg-headBar backdrop-blur-3xl" />
  </div>
</template>
<script setup lang="ts"></script>
