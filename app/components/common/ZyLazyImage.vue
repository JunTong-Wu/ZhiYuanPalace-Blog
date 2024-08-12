<template>
  <div ref="imageWrapperRef" class="relative" :class="className">
    <div v-if="!isLoading && lazyUrl">
      <img v-if="!preview" :src="lazyUrl" :alt="alt" :style="style" />
      <ZyImagePreview
        v-else
        :thumbnailSrc="lazyUrl"
        :sourceSrc="sourceSrc"
        :alt="alt"
        :style="style"
      ></ZyImagePreview>
    </div>
    <div v-else class="loading">
      <ZySkeleton type="image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";

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
  preview: {
    type: Boolean,
    default: false,
  },
});

const isLoading = ref(true);
const lazyUrl = ref("");
const imageWrapperRef = ref<HTMLImageElement>();

onMounted(() => {
  isLoading.value = true;
  const imgElement = new Image();
  imgElement.src = props.src;

  imgElement.onload = () => {
    isLoading.value = false;
  };

  const { stop } = useIntersectionObserver(
    imageWrapperRef,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        lazyUrl.value = props.src;
      }
    }
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
