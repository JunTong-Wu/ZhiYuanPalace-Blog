<template>
  <div
    bg="bg-4 dark:bg-dark-4"
    position-fixed
    bottom-0
    left-0
    right-0
    h-12
    z-20
  >
    <slot />
  </div>
  <div h-16></div>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-bottom-navigation",
});
</script>
