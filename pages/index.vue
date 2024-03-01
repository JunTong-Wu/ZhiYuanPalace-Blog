<template>
  <div pr-toolbar pt-header>
    <div p="4 xs:5 sm:6 md:7 lg:8">TEST</div>
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
