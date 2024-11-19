<template>
  <aside
    class="zy-side-bar text-text-1 px-4 overflow-scroll portrait:hidden select-none border border-r border-t-0 border-b-0 border-l-0 border-borderColor scrollbar-hiden">
    <!-- 上层 -->
    <div class="mb-8"></div>
    <div class="h-music mb-8"></div>
    <Navigation class=" relative z-10" />
    <!-- 底图层 -->
    <Teleport v-if="!isLoading" to="#layout-default">
      <img class="fixed -z-10 inset-0 w-sidebar h-full object-left-center opacity-75" :src="`${cdnUrl}${musicNowCover}`"
        alt="" srcset="" ref="MusicCoverImageRef" />
    </Teleport>
    <!-- 噪点层 -->
    <div class="absolute inset-0 acrylic dark:invert"></div>
  </aside>
</template>
<script setup lang="ts">
import store from '@/store'
const config = useRuntimeConfig();
const cdnUrl = config.public.CDN_URL;

const isLoading = ref(true);
onMounted(() => {
  isLoading.value = false;
})

// Pinia仓库
const { musicNowCover } = toRefs(
  store.useMusicControl()
);
</script>
<style lang="scss" scoped>
.acrylic {
  background: url("@/assets/image/acrylic.png") center/10rem;
}
</style>
