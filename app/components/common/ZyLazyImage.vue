<template>
  <div class="relative" :class="className">
    <div v-if="isLoading" class="loading">
      <ZySkeleton type="image" />
    </div>
    <img v-if="!isLoading" :src="src" :alt="alt" :class="className" :style="style">
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
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
});

const isLoading = ref(false);

if (process.client) {
  isLoading.value = true;
  const imgElement = new Image();
  imgElement.src = props.src;

  imgElement.onload = () => {
    isLoading.value = false;
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = props.src;
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(imgElement);
}
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
