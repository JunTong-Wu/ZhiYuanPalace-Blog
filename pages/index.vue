<template>
  <div>
    <h2>Index</h2>
    <zy-button>TEST</zy-button>
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
