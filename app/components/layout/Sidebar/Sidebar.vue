<template>
  <aside class="zy-side-bar text-text-1 overflow-scroll select-none scrollbar-hiden transition-all" :class="{
    'px-4': !hide,
    'px-2': hide,
  }">
    <!-- 上层 -->
    <div class="mb-8"></div>
    <VisitorNavigation v-if="!isAdminSidebar" :hide="hide" class="relative z-10" />
    <AdminNavigation v-else :hide="hide" class="relative z-10" />
  </aside>
</template>
<script setup lang="ts">
const props = defineProps({
  isAdminSidebar: {
    type: Boolean,
    default: false,
  },
  hide: {
    type: Boolean,
    default: false,
  },
});
</script>