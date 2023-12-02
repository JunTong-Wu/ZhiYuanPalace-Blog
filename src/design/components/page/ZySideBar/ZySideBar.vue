<template>
  <div bg="bg-2" w-sidebar h-100vh relative z-20>
    <slot />
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-side-bar",
});
</script>
