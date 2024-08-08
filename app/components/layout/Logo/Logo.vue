<template>
  <div class="zy-header-logo-wrapper h-header">
    <div class="flex gap-4 items-center h-full">
      <div class="portrait:hidden color-text-1">
        <div class="h-full w-full flex items-center justify-center">
          <img
            src="@/assets/image/logo.png"
            alt=""
            class="logo-img w-8"
          />
        </div>
      </div>
      <h1
        class="text-base font-bold text-center opacity-50 pointer-events-none select-none"
      >
        {{ $t("zhiYuanPalace") }}
      </h1>
    </div>
  </div>
</template>
<style lang="scss" scoped>
//.zy-header-logo-wrapper {
//  h1 {
//    width: auto;
//    max-width: 0%;
//    overflow: hidden;
//    white-space: nowrap;
//    transition: max-width 0.3s ease-in-out;
//  }
//  &:hover {
//    h1 {
//      max-width: 100%;
//    }
//  }
//}
</style>
<script setup lang="ts"></script>
