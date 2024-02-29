<template>
  <div p="4 xs:5 sm:6 md:7 lg:8" mt-header>
    <zy-button>TEST</zy-button>
    <Toolbar absolute top-0 bottom-0 right-0 w-toolbar />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>
