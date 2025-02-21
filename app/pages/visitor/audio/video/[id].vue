<template>
  <div class="dark w-full h-[100vh] bg-level-b1 text-white">
    <ZyFetchLoading
      :fetchData="videoDataLazyFetch"
      @fetchOnload="showVideo"
    >
      <template #loading></template>
      <template #onload>
        <div v-if="videoData.has_password">
          <div
            class="absolute z-10 landscape:top-12 landscape:left-12 flex items-center justify-center"
          >
            <GoBackButton
              class="dark landscape:bg-black !m-0 landscape:rounded-full landscape:opacity-30"
            />
          </div>
          <PassWordModel
            type="video"
            dark
            :id="videoData.video_id"
            class="!pt-20"
            @validate-success="getVideoWithPassword"
          >
          </PassWordModel>
        </div>
        <div
          v-else
          class="w-full h-[100vh]"
        >
          <VideoPlayer :videoData="videoData as VideoModelType" />
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
  const videoData = ref<VideoModelType>(new video.Video());
  let videoDataLazyFetch = await ApiVideo.showVideo({ video_id: id });

  // 获取加密的视频内容
  const getVideoWithPassword = async (params: { password: string }) => {
    videoDataLazyFetch = await ApiVideo.showVideo({
      video_id: id,
      video_password: params.password,
    });
  };
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
