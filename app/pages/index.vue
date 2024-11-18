<template>
  <CommonMainSection>
    <template #header>
      <Welcome />
    </template>
    <div class="grid grid-cols-12 gap-4 mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8">
      <div class="col-span-12">
        <PostTypeGrid />
      </div>
    </div>
    <Toolbar>123123</Toolbar>
  </CommonMainSection>
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
