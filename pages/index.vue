<template>
  <div mt-header>
    <zy-button>TEST</zy-button>
    <Toolbar absolute top-0 bottom-0 right-0 w-toolbar />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'first-layer',
    mode: 'out-in'
  },
  middleware: "transition",
});
</script>
