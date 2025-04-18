<template>
  <div>
    <!-- 返回按钮 -->
    <div
      class="absolute z-10 landscape:top-12 landscape:left-12 flex items-center justify-center"
    >
      <GoBackButton
        class="dark landscape:bg-black !m-0 landscape:rounded-full landscape:opacity-30"
      />
    </div>
    <!-- 背景图 -->
    <div class="portrait:hidden absolute w-full h-full">
      <img
        :src="`${cdnUrl}${videoData.video_cover}`"
        alt=""
        class="w-full h-full object-cover blur-3xl brightness-75 scale-125"
      />
    </div>
    <!-- 视频播放器 -->
    <div class="absolute w-full h-full pb-20 portrait:pb-36 portrait:pt-header">
      <div
        class="absolute landscape:hidden w-full h-3/4 flex items-center justify-center transition-all duration-500"
        :class="{
          'opacity-0': playStatus,
          'opacity-75': !playStatus,
        }"
      >
        <div v-if="playStatus">
          <UIcon
            name="i-solar-pause-bold"
            class="w-16 h-16 drop-shadow-lg"
          />
        </div>
        <div v-if="!playStatus">
          <UIcon
            name="i-solar-play-bold"
            class="w-16 h-16 drop-shadow-lg"
          />
        </div>
      </div>
      <video
        ref="videoElement"
        class="w-full h-full"
        @click="togglePlay"
        x-webkit-airplay="allow"
        playsinline
        webkit-playsinline
        x5-playsinline
        t7-video-player-type="inline"
        x5-video-player-type="h5-page"
        disablePictureInPicture
        muted
        autoplay
      ></video>
    </div>
    <!-- 视频介绍 -->
    <div
      class="absolute bottom-20 w-full portrait:bottom-14 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)]"
    >
      <div class="p-12 portrait:p-4 flex items-center gap-4">
        <div class="p-1 bg-white rounded-full">
          <img
            src="@/assets/image/avatar.jpg"
            alt=""
            class="w-10 h-10 rounded-full"
          />
        </div>
        <div>
          <h2 class="text-lg font-bold portrait:text-sm">
            @玉淇冰Mebius ·
            <span class="font-normal text-sm portrait:text-xs">
              {{ dateFormat(videoData.video_date, "YYYY-MM-DD") }}
            </span>
          </h2>
          <p class="text-sm drop-shadow-lg portrait:text-sm">
            {{ videoData.video_text }}
          </p>
        </div>
      </div>
    </div>
    <!-- 视频控制栏 -->
    <div
      class="absolute bottom-0 w-full h-20 portrait:h-14 flex items-center justify-between px-12 portrait:px-4 bg-[rgba(0,0,0,0.4)]"
    >
      <div class="absolute -top-1 portrait:-top-2 left-0 w-full">
        <URange
          @mousedown.stop
          @mousemove.stop
          @mouseup.stop
          @input="progressBarInput"
          v-model="progressBar"
        />
      </div>
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center gap-4 portrait:gap-2">
          <div class="flex">
            <ZyButton
              class="h-music aspect-square"
              title="播放"
              type="transparent"
              @click.stop="togglePlay"
            >
              <template v-if="playStatus">
                <UIcon
                  name="i-solar-pause-bold"
                  class="w-8 h-8 portrait:w-6 portrait:h-6"
                />
              </template>
              <template v-else>
                <UIcon
                  name="i-solar-play-bold"
                  class="w-8 h-8 portrait:w-6 portrait:h-6"
                />
              </template>
            </ZyButton>
          </div>
          <div class="flex gap-2 portrait:text-xs">
            <div class="">
              {{ currentTime }}
            </div>
            /
            <div class="">
              {{ duration }}
            </div>
          </div>
        </div>
        <!-- 点赞评论 -->
        <div class="flex items-center gap-4 portrait:gap-4">
          <ZyButton
            title="点赞"
            type="transparent"
          >
            <UIcon
              name="i-solar-heart-bold"
              class="w-8 h-8 portrait:w-6 portrait:h-6"
            />
          </ZyButton>
          <ZyButton
            title="评论"
            type="transparent"
          >
            <UIcon
              name="i-solar-chat-round-dots-bold"
              class="w-8 h-8 portrait:w-6 portrait:h-6"
            />
          </ZyButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { video } from "@@/models";
  type VideoModelType = video.Video;

  const props = defineProps({
    videoData: {
      type: Object as () => VideoModelType,
      default: new video.Video(),
    },
  });
  const playStatus = ref(false);

  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;

  const videoElement = ref<HTMLVideoElement>();

  const init = () => {
    if (videoElement.value) {
      videoElement.value.src = `${cdnUrl}${props.videoData.video_path}`;
      videoElement.value.loop = true;
      videoElement.value.load();
      videoElement.value.volume = 0.5;
      videoElement.value.muted = false;
      progressInit();
      if (videoElement.value.paused) {
        videoElement.value.play();
        if (videoElement.value.paused) {
          // 播放失败,证明是首次进入页面
          playStatus.value = false;
        } else {
          playStatus.value = true;
        }
      }
    }
  };

  // 播放/暂停
  const togglePlay = () => {
    if (videoElement.value) {
      if (videoElement.value.paused) {
        playStatus.value = true;
        videoElement.value.play();
      } else {
        playStatus.value = false;
        videoElement.value.pause();
      }
    }
  };

  // 控制audio进度条
  const progressBar = ref(0);
  const currentTime = ref("00:00");
  const duration = ref("--:--");

  const formatTime = (time: number) => {
    if (Number.isNaN(time)) {
      return "--:--";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const progressInit = () => {
    if (videoElement.value) {
      videoElement.value.addEventListener("timeupdate", () => {
        if (videoElement.value) {
          const progress =
            (videoElement.value.currentTime / videoElement.value.duration) *
            100;
          currentTime.value = formatTime(videoElement.value.currentTime);
          duration.value = formatTime(videoElement.value.duration);
          progressBar.value = progress;
        }
      });
    }
  };

  // 进度条拖动时更新视频播放位置
  const progressBarInput = () => {
    if (videoElement.value) {
      const newTime = (progressBar.value / 100) * videoElement.value.duration;
      videoElement.value.currentTime = newTime;
    }
  };

  onMounted(() => {
    init();
  });
</script>
