<template>
  <div class="relative">
    <div class="relative h-full w-full">
      <div
        v-if="locked"
        class="absolute top-0 left-0 z-10 w-full h-full bg-mask flex items-center justify-center"
      >
        <p
          class="locked-icon flex items-center justify-center w-1/2 h-1/2 max-w-16 max-h-16 rounded-full bg-mask-dark opacity-20 dark:opacity-40"
        >
          <UIcon
            name="i-solar-lock-password-bold-duotone"
            class="w-full h-full"
          />
        </p>
      </div>
      <img
        v-if="!imageError"
        ref="imageElementRef"
        :src="src"
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
    },
  });
  const imageElementRef = ref<HTMLImageElement>();
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
  const imageError = ref(false);

  onMounted(() => {
    const imgElement = new Image();
    imgElement.src = props.src;

    imgElement.onload = () => {
      imageError.value = false;
    };

    imgElement.onerror = () => {
      imageError.value = true;
    };
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
