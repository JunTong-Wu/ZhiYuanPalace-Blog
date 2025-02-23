<template>
  <div :class="{ 'pt-main': !noPaddingMain }">
    <div
      :class="{
        '!pt-0': noPaddingTop,
        'py-6 portrait:py-2 portrait:sm:py-4 portrait:lg:py-6 landscape:py-8':
          fullWidth,
        'p-6 portrait:p-2 portrait:sm:p-4 portrait:lg:p-6 landscape:p-8':
          !fullWidth,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    noPaddingTop: {
      type: Boolean,
      default: false,
    },
    noPaddingMain: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  });
</script>
