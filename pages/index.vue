<template>
  <CommonMainSection>
    <div
      class="grid grid-cols-12 gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8"
    >
      <div class="col-span-12">
        <Banner />
      </div>
      <div class="col-span-12">
        <PostTypeGrid />
      </div>
    </div>
    <Toolbar />
  </CommonMainSection>
</template>
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>
