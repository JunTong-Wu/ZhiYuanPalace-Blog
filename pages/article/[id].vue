<template>
  <div>
    <div>ARTICLE TEST</div>
    <zy-Link :to="`/`">Go Home</zy-Link>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "transition",
});
</script>
