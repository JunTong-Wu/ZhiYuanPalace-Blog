<template>
  <div class="p-4">
    <div class="rounded text-text-1 p-4">
      <AdminNavigation class="relative z-10" @change="closeDrawer" />
    </div>
    <div class="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-end">
      <slot name="footer" />
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['closeDrawer']);
const closeDrawer = () => {
  emit('closeDrawer');
};
</script>
