<template>
  <section class="root" :class="{ 'pt-main': !noPaddingTop }">
    <div class="p-8 portrait:px-4 portrait:sm:px-6 portrait:lg:px-8">
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
