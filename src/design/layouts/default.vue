<template>
  <div h-full bg=" [#ffffff] dark:[#10102f]">
    <div flex max-w-7xl mx-auto>
      <Header />
      <SideBar class="horizontal-layout" />
      <main flex-1 bg="bg-transparent">
        <section class="absolute inset-0">
          <picture
            class="pointer-events-none absolute inset-x-0 top-0 dark:hidden"
          >
            <img
              src="@/src/assets/image/gradient.jpg"
              alt="gradient"
              class="w-full"
            />
          </picture>
          <picture
            class="pointer-events-none absolute inset-x-0 top-0 hidden dark:block"
          >
            <img
              src="@/src/assets/image/gradient_dark.jpg"
              alt="gradient dark"
              class="w-full"
            />
          </picture>

          <div class="container h-full">
            <div class="grid h-full items-center gap-4 md:grid-cols-12">
              <!-- Hero image -->
              <div class="col-span-6 xl:col-span-8"></div>
            </div>
          </div>
        </section>
        <slot />
      </main>
      <RightBar class="horizontal-layout" />
      <Footer class="vertical-layout" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Footer from "./default/Footer/Footer.vue";
import Header from "./default/Header/Header.vue";
import SideBar from "./default/SideBar/SideBar.vue";
import RightBar from "./default/RightBar/RightBar.vue";
</script>
