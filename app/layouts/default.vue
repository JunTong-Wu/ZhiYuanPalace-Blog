<template>
  <div id="layout-default" class="relative overflow-hidden">
    <Sidebar
      class="fixed top-0 bottom-0 left-0 w-sidebar z-40 border-r border-borderColor bg-bg-opaque"
    />
    <Header
      class="fixed top-0 left-sidebar right-0 z-40 landscape:backdrop-blur-3xl landscape:bg-bg-headBar portrait:bg-bg-opaque"
    />

    <div
      id="layout-default-main"
      class="layout-default-main relative z-20 mr-toolbar"
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
      class="fixed top-music landscape:left-4 w-music z-50 portrait:bg-bg-opaque  landscape:shadow-sm"
    />
    <FooterColumns />
    <FooterNavigation
      class="fixed z-40 bottom-0 left-0 right-0 z-60 bg-bg-opaque"
    />
  </div>
</template>
