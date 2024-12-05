<template>
  <div class="zy-image-preview cursor-pointer" @click="togglePreview" :class="className">
    <img :src="thumbnailSrc" :alt="alt" :style="style" />
    <Teleport to="#zy-image-preview-root">
      <HeadlessTransitionRoot :show="previewOpen" appear as="template">
        <HeadlessTransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed z-[100] top-0 left-0 w-full h-full transition-opacity duration-200 bg-[rgba(0,0,0,0.5)]"
            @click="togglePreview">
            <div class="flex flex-col items-center justify-center h-full w-full">
              <div v-loading v-if="isLoading"
                class="w-full h-full flex flex-col items-center justify-center brightness-50">
                <img :src="thumbnailSrc" :alt="alt" :style="style" />
              </div>
              <img v-else class="w-full h-full object-contain" :src="sourceSrc" :alt="alt" :style="style" />
            </div>
          </div>
        </HeadlessTransitionChild>
      </HeadlessTransitionRoot>
    </Teleport>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  thumbnailSrc: {
    type: String,
    required: true,
  },
  sourceSrc: {
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
});
const thumbnailSrc = computed(() => props.thumbnailSrc);
const sourceSrc = computed(() => props.sourceSrc);
const previewOpen = ref(false);
const togglePreview = () => {
  previewOpen.value = !previewOpen.value;
  if (previewOpen.value) {
    const body = document.documentElement;
    if (body) {
      body.style.overflow = "hidden";
    }
  } else {
    const body = document.documentElement;
    if (body) {
      body.style.overflow = "auto";
    }
  }
};

const isLoading = ref(true);

const createImgPreviewRoot = () => {
  const imgPreviewRoot = document.createElement('div');
  imgPreviewRoot.id = 'zy-image-preview-root';
  document.body.appendChild(imgPreviewRoot);
};

onBeforeMount(() => {
  const imgPreviewRoot = document.getElementById('zy-image-preview-root');
  if (imgPreviewRoot) {
    return;
  } else {
    createImgPreviewRoot();
  }
}),


  onMounted(() => {
    isLoading.value = true;
    const imgElement = new Image();
    imgElement.src = props.sourceSrc;

    imgElement.onload = () => {
      // isLoading.value = false;
    };
  });
</script>
<style lang="scss" scoped>
.zy-image-preview {
  display: inline-block;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
}
</style>
