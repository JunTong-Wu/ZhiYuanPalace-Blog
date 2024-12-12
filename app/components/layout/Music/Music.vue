<template>
  <aside id="zy-music-bar" class="h-music select-none portrait:rounded-2xs text-white">
    <div class="relative z-10 h-full flex items-center landscape:rounded-xs portrait:rounded-2xs overflow-hidden">
      <div class="absolute top-0 right-0 -z-1 w-full h-full">
        <img v-if="!isLoading" class="h-full w-full object-cover" :src="`${cdnUrl}${musicNowCover}`" alt="" srcset=""
          ref="MusicCoverImageRef" />
      </div>
      <div
        class="absolute top-0 right-0 -z-1 w-full h-full bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(0,0,0,0.8)] backdrop-blur-3xl">
      </div>
      <div class="flex flex-none relative h-full aspect-square">
        <img class="h-[80%] absolute bottom-[10%] drop-shadow-md left-6 portrait:drop-shadow-none"
          src="@/assets/image/record-128.png" alt="" srcset="" />
        <img v-if="!isLoading" class="h-full relative left-0 rounded-2xs shadow-md portrait:shadow-none"
          :src="`${cdnUrl}${musicNowCover}`" alt="" srcset="" ref="MusicCoverImageRef" @load="createDecoration()" />
        <div v-else class="h-full w-full relative left-0 rounded-2xs shadow-md bg-theme-500">
        </div>
      </div>

      <div class="ml-8"></div>
      <div class="flex h-full w-full items-center pr-2 bottom-0 top-0 relative landscape:xs:hidden landscape:md:flex">
        <p class="flex-1 line-clamp-1 text-xs">
          {{ musicNowTitle }} - {{ musicNowSinger }}
        </p>
      </div>

      <div class="flex bottom-0 left-0 right-0">
        <div class="flex">
          <ZyButton class="h-music aspect-square" title="上一曲" type="transparent" @click="musicPrev">
            <UIcon name="i-solar-skip-previous-bold" class="w-4 h-4" />
          </ZyButton>
        </div>
        <div class="flex">
          <ZyButton class="h-music aspect-square" title="播放" type="transparent" @click="togglePlay">
            <template v-if="musicPlayState">
              <UIcon name="i-solar-pause-circle-bold" class="w-8 h-8" />
            </template>
            <template v-else>
              <UIcon name="i-solar-play-circle-bold" class="w-8 h-8" />
            </template>
          </ZyButton>
        </div>
        <div class="flex">
          <ZyButton class="h-music aspect-square" title="下一曲" type="transparent" @click="musicNext">
            <UIcon name="i-solar-skip-next-bold" class="w-4 h-4" />
          </ZyButton>
        </div>
        <!-- <div>
          <ZyButton class="portrait:h-music aspect-square" title="播放列表" type="transparent">
            <ZyIcon class="landscape:hidden" size="1rem" defaultName="music-list" />
            <ZyIcon class="portrait:hidden" size="1rem" defaultName="music-list" />
          </ZyButton>
        </div> -->
      </div>
    </div>
    <audio id="bgMusic" type="audio/ogg" v-if="!refreshAudioElement" loop>
      <source :src="`${cdnUrl}${musicNowAudio}`" />
    </audio>
  </aside>
</template>
<script setup lang="ts">
import "./transition.scss"

const isLoading = ref(true);
const config = useRuntimeConfig();
const cdnUrl = config.public.CDN_URL;

const MusicCoverImageRef = ref();

onMounted(() => {
  isLoading.value = false;
  watch(MusicCoverImageRef, (newValue: any) => {
    if (newValue.width > 0 && newValue.height > 0) {
      createDecoration();
    }
  });
})

// 生成tailwind颜色
const createDecoration = () => {

  const img = MusicCoverImageRef.value;
  if (img) {
    const imageColor = getImageColor(img);
    const rgb = increaseSaturation(
      adjustBrightnessWhilePreservingHue(imageColor, 40, 40),
      5
    );
    const themeColor = `rgb(${rgb})`;
    const themeColorRGB = `${rgb}`;
    const themeColorTailwind = generateTailwindColors(rgb);
    document.body.setAttribute(
      "style",
      `
      --theme-color: ${themeColor};
      --theme-color-rgb: ${themeColorRGB};
      --theme-color-50: ${themeColorTailwind[50]};
      --theme-color-100: ${themeColorTailwind[100]};
      --theme-color-200: ${themeColorTailwind[200]};
      --theme-color-300: ${themeColorTailwind[300]};
      --theme-color-400: ${themeColorTailwind[400]};
      --theme-color-500: ${themeColorTailwind[500]};
      --theme-color-600: ${themeColorTailwind[600]};
      --theme-color-700: ${themeColorTailwind[700]};
      --theme-color-800: ${themeColorTailwind[800]};
      --theme-color-900: ${themeColorTailwind[900]};
      --theme-color-950: ${themeColorTailwind[950]};
      `
    );
  }
};

// Pinia仓库
const { togglePlay, musicPrev, musicNext, musicNowTitle, musicNowSinger, musicNowCover, musicNowAudio, musicPlayState } = toRefs(
  store.useMusicControl()
);

const refreshAudioElement = ref(false);

// 控制audio播放，暂停
watch(musicPlayState, (newValue) => {
  const audioElement = document.getElementById("bgMusic") as HTMLMediaElement;
  if (newValue) {
    audioElement.play();
  } else {
    audioElement.pause();
  }
});

// 控制audio切换音乐
watch(musicNowAudio, async () => {
  refreshAudioElement.value = true;
  setTimeout(() => {
    refreshAudioElement.value = false;
    setTimeout(() => {
      const audioElement = document.getElementById(
        "bgMusic"
      ) as HTMLMediaElement;
      if (musicPlayState.value) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }, 0);
  }, 0);
});
</script>
