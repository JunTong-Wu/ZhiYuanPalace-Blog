<template>
  <div
    class="rounded bg-level-2 absolute left-4 right-4 top-16 bottom-16 overflow-y-auto text-text-1 p-4"
    @touchmove.stop
  >
    <DocumentNavigation
      class="relative z-10"
      @change="closeDrawer"
    />
  </div>
</template>
<script setup lang="ts">
  const emit = defineEmits(["closeDrawer"]);
  const closeDrawer = () => {
    emit("closeDrawer");
  };
</script>
