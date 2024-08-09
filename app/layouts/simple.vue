<template>
  <div id="layout-simple" class="relative overflow-hidden">

    <div
        id="layout-simple-main"
        class="layout-simple-main relative z-20"
    >
      <main>
        <div class="main-view text-base relative overflow-hidden">
          <div class="main-view-inner">
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>