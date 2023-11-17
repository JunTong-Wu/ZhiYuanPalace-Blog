<template>
  <div bg="bg-4 dark:bg-dark-4" position-fixed bottom-0 left-0 right-0 h-16>
    <slot />
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-bottom-navigation",
});
</script>
