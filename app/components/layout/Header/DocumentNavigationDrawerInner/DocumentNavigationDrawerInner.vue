<template>
  <div class="p-4">
    <div class="rounded text-text-1 p-4">
      <DocumentNavigation
        class="relative z-10"
        @change="closeDrawer"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  const emit = defineEmits(["closeDrawer"]);
  const closeDrawer = () => {
    emit("closeDrawer");
  };
</script>
