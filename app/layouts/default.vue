<template>
  <div id="layout-default" class="relative overflow-hidden">
    <Sidebar
      class="fixed top-0 bottom-0 left-0 w-sidebar z-40 pt-main border-r border-borderColor bg-bg-opaque"
    />
    <div
      class="w-sidebar h-full fixed z-30 top-0 left-0 portrait:hidden pointer-events-none"
    ></div>
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
      class="fixed top-music landscape:right-8 w-music portrait:z-50 landscape:z-30 portrait:bg-bg-opaque landscape:rounded-3xl landscape:overflow-hidden landscape:shadow-sm"
    />
    <FooterColumns />
    <FooterNavigation
      class="fixed z-40 bottom-0 left-0 right-0 z-60 bg-bg-opaque"
    />
  </div>
</template>
