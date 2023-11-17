<template>
  <div bg="bg-4 dark:bg-dark-4" position-fixed top-0 left-0 right-0 h-12 z-20>
    <slot />
  </div>
  <div h-12></div>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-header",
});
</script>
