<template>
  <div class="w-full h-[100vh] bg-black text-white">
    <ZyFetchLoading
      :fetchData="videoDataLazyFetch"
      @fetchOnload="showVideo"
    >
      <template #loading></template>
      <template #onload>
        <div class="w-full h-[100vh]">
          <VideoPlayer
            ref="VideoPlayerRef"
            :videoData="videoData as VideoModelType"
          />
        </div>
      </template>
    </ZyFetchLoading>
  </div>
</template>
<script setup lang="ts">
  import { video } from '@@/models';
  type VideoModelType = video.Video;

  const route = useRoute();
  const id = route.params.id as string;
  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;

  // 获取视频内容
  const videoDataLazyFetch = await ApiVideo.showVideo({ video_id: id });
  const videoData = ref<VideoModelType>(new video.Video());
  const VideoPlayerRef = ref();
  const showVideo = (result: ResOptionsModelType<VideoModelType>) => {
    videoData.value = result.data;
  };

  onMounted(() => {
    const body = document.documentElement;
    if (body) {
      body.style.overflow = 'hidden';
    }
  });

  onUnmounted(() => {
    const body = document.documentElement;
    if (body) {
      body.style.overflow = 'auto';
    }
  });
</script>
