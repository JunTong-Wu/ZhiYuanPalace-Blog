<template>
  <div class="pt-main">
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
  layout: "default",
  layoutTransition: {
    mode: "out-in",
  },
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>
