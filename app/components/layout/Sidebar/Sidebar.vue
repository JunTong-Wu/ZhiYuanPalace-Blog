<template>
  <aside class="zy-side-bar text-text-1 px-4 overflow-scroll portrait:hidden select-none scrollbar-hiden">
    <!-- 上层 -->
    <div class="mb-8"></div>
    <VisitorNavigation v-if="!isAdminSidebar" class=" relative z-10" />
    <AdminNavigation v-else class="relative z-10" />
  </aside>
</template>
<script setup lang="ts">
const props = defineProps({
  isAdminSidebar: {
    type: Boolean,
    default: false,
  },
});
</script>
