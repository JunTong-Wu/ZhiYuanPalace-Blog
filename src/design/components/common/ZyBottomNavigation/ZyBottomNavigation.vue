<template>
  <div
    un-bg="bg-4 dark:bg-dark-4"
    un-position="fixed"
    un-bottom="0"
    un-left="0"
    un-right="0"
    un-h="16"
  >
    <slot />
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-bottom-navigation",
});
</script>
