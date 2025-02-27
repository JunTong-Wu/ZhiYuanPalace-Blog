<template>
  <div
    ref="imageWrapperRef"
    class="relative w-full h-full"
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
      <div v-if="!preview">
        <img
          v-if="!imageError"
          ref="imageElementRef"
          :src="lazyUrl"
          :alt="alt"
          :style="style"
          :class="imageClassList"
        />
        <div
          v-else
          class="flex flex-col items-center justify-center gap-2"
          :class="imageClassList"
        >
          <UIcon
            name="i-solar-gallery-bold-duotone"
            class="w-16 h-16 opacity-20"
          />
          <span class="text-text-3 font-bold text-xs">无图片</span>
        </div>
      </div>
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
      :class="imageClassList"
    >
      <ZySkeleton
        type="image"
        class="w-full h-full"
      />
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
    locked: {
      type: Boolean,
      default: false,
    },
  });

  const isLoading = ref(true);
  const lazyUrl = ref("");
  const imageWrapperRef = ref<HTMLImageElement>();
  const imageElementRef = ref<HTMLImageElement>();

  const imageError = ref(false);

  const imageClassList = computed(() => {
    let classList = [];
    if (props.locked) {
      classList.push("!blur-3xl", "!scale-150", "!saturate-200");
    }
    if (props.className) {
      classList.push(props.className.split(" "));
    }
    return classList;
  });

  onMounted(() => {
    isLoading.value = true;
    const imgElement = new Image();
    imgElement.src = props.src;

    imgElement.onload = () => {
      isLoading.value = false;
      imageError.value = false;
    };

    imgElement.onerror = () => {
      isLoading.value = false;
      imageError.value = true;
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
