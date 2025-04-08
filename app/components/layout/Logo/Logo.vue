<template>
  <div class="zy-header-logo-wrapper flex-none">
    <div
      class="flex items-center h-full w-full"
      :class="{
        'gap-1': size === 'small',
        'gap-2': size === 'default',
        'gap-4': size === 'large',
      }"
    >
      <div class="h-full flex items-center justify-center flex-none">
        <img
          src="@/assets/image/logo.png"
          alt=""
          class="logo-img"
          :class="{
            'w-4': size === 'small',
            'w-8': size === 'default',
            'w-16': size === 'large',
          }"
        />
      </div>
      <div
        class="h-full flex items-center justify-center opacity-80 dark:invert"
      >
        <img
          src="@/assets/image/logo-text.png"
          alt=""
          class="logo-text"
          :class="{
            'w-12': size === 'small',
            'w-20': size === 'default',
            'w-36': size === 'large',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    size: { type: String, default: "default" },
  });
</script>

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
