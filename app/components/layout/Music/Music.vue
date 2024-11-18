<template>
  <aside id="zy-music-bar" class="h-music">
    <div
      class="relative z-10 h-full portrait:flex items-center landscape:rounded landscape:bg-theme-500 landscape:shadow-lg landscape:shadow-theme-500 landscape:dark:bg-theme-700 landscape:dark:shadow-theme-700">
      <div
        class="portrait:hidden absolute top-0 right-0 -z-1 w-full h-full bg-gradient-to-b from-theme-500 to-transparent mix-blend-multiply rounded">
      </div>
      <div class="flex flex-none relative h-[120%] aspect-square landscape:h-16 landscape:left-4 landscape:top-4">
        <img class="h-[90%] absolute bottom-[5%] drop-shadow-md left-5 landscape:left-6"
          src="../../../assets/image/record-128.png" alt="" srcset="" />
        <img v-if="!isLoading" class="h-full relative left-0 rounded-3xs portrait:shadow-md"
          :src="`${cdnUrl}${musicNowCover}`" alt="" srcset="" ref="MusicCoverImageRef" @load="createDecoration()" />
        <div v-else class="h-full w-full relative left-0 rounded portrait:shadow-md bg-theme-500"></div>
      </div>

      <div
        class="portrait:ml-8 portrait:flex portrait:h-full w-full items-center pr-2 bottom-0 top-0 landscape:p-4 relative">
        <p class="flex-1 line-clamp-1 landscape:hidden text-xs">
          {{ musicNowTitle }} - {{ musicNowSinger }}
        </p>
        <p class="flex-1 line-clamp-2 portrait:hidden mt-2 text-white">
          <span class="text-base block">{{ musicNowTitle }}</span>
          <span class="text-xs">{{ musicNowSinger }}</span>
        </p>
      </div>
      <div
        class="flex landscape:absolute bottom-0 left-0 right-0 landscape:p-4 landscape:justify-around landscape:text-white">
        <div class="flex">
          <ZyButton class="portrait:h-music aspect-square" title="上一曲" type="transparent" @click="musicPrev">
            <UIcon name="i-fluent-previous-16-filled" class="w-5 h-5 portrait:w-4 portrait:h-4" />
          </ZyButton>
        </div>
        <div class="flex">
          <ZyButton class="portrait:h-music aspect-square portrait:text-theme-700" title="播放" type="transparent"
            @click="togglePlay">
            <template v-if="musicPlayState">
              <UIcon name="i-fluent-pause-circle-16-filled" class="w-10 h-10 portrait:w-8 portrait:h-8" />
            </template>
            <template v-else>
              <UIcon name="i-fluent-play-circle-16-filled" class="w-10 h-10 portrait:w-8 portrait:h-8" />
            </template>
          </ZyButton>
        </div>
        <div class="flex">
          <ZyButton class="portrait:h-music aspect-square" title="下一曲" type="transparent" @click="musicNext">
            <UIcon name="i-fluent-next-16-filled" class="w-5 h-5 portrait:w-4 portrait:h-4" />
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
import store from '@/store'

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
      adjustBrightnessWhilePreservingHue(imageColor, 80, 30),
      2
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
