<template>
  <div ref="imageWrapperRef" class="relative" :class="className">
    <div class="relative">
      <div v-if="locked"
        class="absolute top-0 left-0 z-10 w-full h-full bg-mask backdrop-blur-3xl portrait:backdrop-blur-lg backdrop-saturate-200 flex items-center justify-center">
        <p
          class="locked-icon flex items-center justify-center w-1/2 h-1/2 max-w-16 max-h-16 rounded-full bg-mask-dark opacity-20 dark:opacity-40">
          <UIcon name="i-solar-lock-password-bold-duotone" class="w-full h-full" />
        </p>
      </div>
      <img :src="src" :alt="alt" :style="style" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
    style: {
      type: Object,
      default: () => ({}),
    },
    locked: {
      type: Boolean,
      default: false,
    }
  });
  const imageWrapperRef = ref<HTMLImageElement>();
</script>

<style scoped>
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
