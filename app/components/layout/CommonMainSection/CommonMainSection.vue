<template>
  <div :class="{ 'pt-main': !noPaddingMain }">
    <div>
      <slot name="fullwidth"></slot>
    </div>
    <div
      class="p-6 portrait:p-2 portrait:sm:p-4 portrait:lg:p-6"
      :class="{ 'pt-0': noPaddingTop }"
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
  });
</script>
