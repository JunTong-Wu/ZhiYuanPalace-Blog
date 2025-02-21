<template>
  <div
    ref="imageWrapperRef"
    class="relative"
    :class="[isLoading ? 'w-full h-full' : '', className]"
  >
    <div
      v-if="!isLoading && lazyUrl"
      class="relative"
    >
      <div
        v-if="locked"
        class="absolute top-0 left-0 z-10 w-full h-full bg-mask flex items-center justify-center"
      >
        <p
          class="relative z-10 locked-icon flex items-center justify-center w-1/2 h-1/2 max-w-16 max-h-16 rounded-full bg-mask-dark opacity-20 dark:opacity-40"
        >
          <UIcon
            name="i-solar-lock-password-bold-duotone"
            class="w-full h-full"
          />
        </p>
      </div>
      <img
        v-if="!preview"
        :src="lazyUrl"
        :alt="alt"
        :style="style"
        :class="{
          '!blur-3xl !scale-150 !saturate-200': locked,
        }"
      />
      <ZyImagePreview
        v-else
        :thumbnailSrc="lazyUrl"
        :sourceSrc="sourceSrc"
        :alt="alt"
        :style="style"
      ></ZyImagePreview>
    </div>
    <div
      v-else
      class="loading"
    >
      <ZySkeleton
        type="image"
        class="w-full h-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useIntersectionObserver } from '@vueuse/core';

  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
    sourceSrc: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    style: {
      type: Object,
      default: () => ({}),
    },
    preview: {
      type: Boolean,
      default: false,
    },
    locked: {
      type: Boolean,
      default: false,
    },
  });

  const isLoading = ref(true);
  const lazyUrl = ref('');
  const imageWrapperRef = ref<HTMLImageElement>();

  onMounted(() => {
    isLoading.value = true;
    const imgElement = new Image();
    imgElement.src = props.src;

    imgElement.onload = () => {
      isLoading.value = false;
    };
    useIntersectionObserver(
      imageWrapperRef,
      ([{ isIntersecting }], observerElement) => {
        if (isIntersecting) {
          lazyUrl.value = props.src;
        }
      },
    );
  });
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
