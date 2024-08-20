<template>
  <div id="layout-default" class="relative overflow-hidden">
    <Sidebar class="fixed top-header bottom-0 left-0 w-sidebar z-40 bg-bg-opaque" />
    <Header class="fixed top-0 z-40 h-header w-full" />
    <div
      id="layout-default-main"
      class="layout-default-main relative z-10 mr-toolbar"
    >
      <main class="flex-1 pl-sidebar">
        <div class="main-view text-base relative overflow-hidden">
          <div class="main-view-inner">
            <slot />
          </div>
        </div>
      </main>
    </div>
    <Music
      class="fixed top-music landscape:left-4 w-music z-50 portrait:bg-bg-bestCard landscape:shadow-sm"
    />
    <FooterColumns />
    <FooterNavigation
      class="fixed z-40 bottom-0 left-0 right-0 z-60 bg-bg-headBar backdrop-blur-3xl border-t border-borderColor"
    />
  </div>
</template>
<script setup lang="ts"></script>
