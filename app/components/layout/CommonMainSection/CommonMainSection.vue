<template>
  <div class="pt-main">
    <div>
      <slot name="fullwidth"></slot>
    </div>
    <div class="p-6 portrait:px-4 portrait:sm:px-5 portrait:lg:px-6" :class="{ 'pt-0': noPaddingTop }">
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
});
</script>
