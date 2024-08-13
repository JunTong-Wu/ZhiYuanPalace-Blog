<template>
  <div
    class="p-4 bg-theme-500 shadow-lg shadow-theme-500 rounded-2xl overflow-hidden flex items-center justify-center flex-col gap-4 relative"
  >
    <div
      class="absolute -z-1 w-full h-full bg-gradient-to-b from-theme-500 to-transparent hue-rotate-30 mix-blend-multiply"
    ></div>
    <div class="relative">
      <div class="p-8 pb-2">
        <img
          class="rounded-full w-full h-full object-cover"
          src="@/assets/image/avatar.jpg"
          alt="Avatar"
        />
      </div>
      <p class="text-white text-lg font-bold">{{ name }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
const name = "玉淇冰";
</script>
