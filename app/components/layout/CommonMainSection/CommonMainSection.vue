<template>
  <section class="root" :class="{ 'pt-main': !noPaddingTop }">
    <div>
      <slot name="fullwidth"></slot>
    </div>
    <div class="p-6 portrait:px-4 portrait:sm:px-5 portrait:lg:px-6">
      <slot></slot>
    </div>
  </section>
</template>
<script setup lang="ts">
const props = defineProps({
  noPaddingTop: {
    type: Boolean,
    default: false,
  },
});
</script>
