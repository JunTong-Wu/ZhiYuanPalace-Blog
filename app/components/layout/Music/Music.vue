<template>
  <aside id="zy-music-bar" class="h-music">
    <div
      class="relative z-10 h-full portrait:flex items-center landscape:rounded-2xl landscape:bg-theme-500 landscape:shadow-lg landscape:shadow-theme-500"
    >
      <div
        class="portrait:hidden absolute top-0 right-0 -z-1 w-full h-full bg-gradient-to-b from-theme-600 to-transparent hue-rotate-30 mix-blend-multiply rounded-2xl"
      ></div>
      <div
        class="flex flex-none relative h-[120%] aspect-square landscape:h-16 landscape:left-4 landscape:top-4"
      >
        <img
          class="h-[90%] absolute bottom-[5%] drop-shadow-md left-5 landscape:left-6"
          src="../../../assets/image/record-128.png"
          alt=""
          srcset=""
        />
        <img
          v-if="!isLoading"
          class="h-full relative left-0 rounded-md portrait:shadow-md"
          :src="musicNowCover"
          alt=""
          srcset=""
          ref="MusicCoverImageRef"
          @load="createDecoration()"
        />
        <div v-else class="h-full w-full relative left-0 rounded-md portrait:shadow-md bg-theme-500"></div>
      </div>

      <div
        class="portrait:ml-8 portrait:flex portrait:h-full w-full items-center pr-2 bottom-0 top-0 landscape:p-4 relative"
      >
        <p
          class="flex-1 landscape:line-clamp-2 portrait:line-clamp-1 text-xs landscape:text-base landscape:mt-4 landscape:text-white"
        >
          你说的话 有心的吗 刺痛我了 无意的吧
        </p>
      </div>
      <div
        class="flex landscape:absolute bottom-0 left-0 right-0 landscape:p-4 landscape:justify-around landscape:text-white"
      >
        <div class="portrait:hidden">
          <ZyButton
            class="portrait:h-music aspect-square"
            title="上一曲"
            type="transparent"
          >
            <ZyIcon
              class="landscape:hidden"
              size="1rem"
              defaultName="music-prev"
            />
            <ZyIcon
              class="portrait:hidden"
              size="1.25rem"
              defaultName="music-prev"
            />
          </ZyButton>
        </div>
        <div>
          <ZyButton
            class="portrait:h-music aspect-square"
            title="播放"
            type="transparent"
          >
            <ZyIcon
              class="landscape:hidden"
              size="1rem"
              defaultName="music-play"
            />
            <ZyIcon
              class="portrait:hidden"
              size="2rem"
              defaultName="music-play"
            />
          </ZyButton>
        </div>
        <div class="portrait:hidden">
          <ZyButton
            class="portrait:h-music aspect-square"
            title="下一曲"
            type="transparent"
          >
            <ZyIcon
              class="landscape:hidden"
              size="1rem"
              defaultName="music-next"
            />
            <ZyIcon
              class="portrait:hidden"
              size="1.25rem"
              defaultName="music-next"
            />
          </ZyButton>
        </div>
        <div>
          <ZyButton
            class="portrait:h-music aspect-square"
            title="播放列表"
            type="transparent"
          >
            <ZyIcon
              class="landscape:hidden"
              size="1rem"
              defaultName="music-list"
            />
            <ZyIcon
              class="portrait:hidden"
              size="1rem"
              defaultName="music-list"
            />
          </ZyButton>
        </div>
      </div>
    </div>
  </aside>
</template>
<script setup lang="ts">
const isLoading = ref(true);
const musicNowCover =
  "https://pan.yiru.love/project-zhiyuanpalace/uploads/music/cover/本兮 - 有心无意.jpg";

const MusicCoverImageRef = ref();

onMounted(()=>{
  isLoading.value = false;
  watch(MusicCoverImageRef, (newValue: any) => {
    if (newValue) {
      createDecoration();
    }
  });
})
const createDecoration = () => {
  const img = MusicCoverImageRef.value;
  if (img) {
    const imageColor = getImageColor(img);
    const rgb = increaseSaturation(
      adjustBrightnessWhilePreservingHue(imageColor, 60, 60),
      5
    );
    const themeColorTranslucent = `rgba(${rgb},0.2)`;
    const themeColor = `rgb(${rgb})`;
    const themeColorRGB = `${rgb}`;
    const themeColorTailwind = generateTailwindColors(rgb);
    document.body.setAttribute(
      "style",
      `
      --theme-color-translucent: ${themeColorTranslucent};
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
</script>
