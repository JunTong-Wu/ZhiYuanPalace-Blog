<template>
  <div>
    <section class="root pt-main">
      <div class="p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8">
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
      </div>
      <Toolbar />
    </section>
  </div>
</template>
<script setup lang="ts">
import Banner from "~/components/page/index/Banner.vue";

definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});
</script>
