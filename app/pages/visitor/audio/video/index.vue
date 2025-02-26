<template>
  <CommonMainSection>
    <ZyFetchLoading
      :fetchData="videoListDataLazyFetch"
      @fetchOnload="showVideoList"
    >
      <template #onload>
        <ul class="row-video">
          <li
            class="clo-video-card"
            v-for="item in videoListData.list"
          >
            <VideoCard :href="`/audio/video/${item.video_id}`">
              <template #image>
                <ZyLazyImage
                  :src="`${cdnUrl}${item.video_cover}`"
                  :locked="item.has_password"
                  alt=""
                />
              </template>
              <template #title>
                <div class="h-full flex flex-col justify-center">
                  <p
                    class="m-0 mt-2 text-base line-clamp-2 landscape:line-clamp-2"
                  >
                    {{ item.video_text.replace(/\r\n/g, "") }}
                  </p>
                  <div class="mt-2 flex justify-between">
                    <span class="text-sm text-text-2">{{
                      dateFormat(item.video_date, "YYYY-MM-DD")
                    }}</span>
                    <div class="flex items-center">
                      <UIcon
                        name="i-solar-play-linear"
                        class="w-4 h-4 mr-2"
                      />
                      <span class="text-sm text-text-2">{{
                        item.video_views
                      }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </VideoCard>
          </li>
        </ul>
      </template>
    </ZyFetchLoading>
  </CommonMainSection>
</template>
<script setup lang="ts">
  import { video } from "@@/models";
  type VideoListModelType = video.VideoList;

  // 获取视频列表
  const videoListDataLazyFetch = await ApiVideo.getVideosList(null);
  const videoListData = ref<VideoListModelType>(new video.VideoList());
  const showVideoList = (result: ResOptionsModelType<VideoListModelType>) => {
    videoListData.value = result.data;
  };

  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;
</script>
