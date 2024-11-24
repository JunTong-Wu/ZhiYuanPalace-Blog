<template>
  <div class="pt-header">
    <Welcome />
    <Slogin />
    <AboutMe />
    <Listen />
    <NewPosts />
    <MorePostType />
    <OpenSource />
    <Toolbar>123123</Toolbar>
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
