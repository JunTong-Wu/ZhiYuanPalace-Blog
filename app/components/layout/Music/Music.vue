<template>
  <aside id="zy-music-bar" class="h-music">
    <div
      class="relative z-10 h-full portrait:flex items-center landscape:rounded-2xl landscape:bg-theme landscape:shadow-lg landscape:shadow-theme"
    >
      <div
        class="portrait:hidden absolute top-0 right-0 -z-1 w-full h-full bg-gradient-to-b from-theme to-transparent hue-rotate-30 mix-blend-multiply rounded-2xl"
      ></div>
      <div
        class="flex flex-none relative h-[120%] landscape:h-16 landscape:left-4 landscape:top-4"
      >
        <img
          class="h-[90%] absolute bottom-[5%] drop-shadow-md left-5 landscape:left-6"
          src="../../../assets/image/record-128.png"
          alt=""
          srcset=""
        />
        <img
          class="h-full relative left-0 rounded-md portrait:shadow-md"
          :src="musicNowCover"
          alt=""
          srcset=""
          ref="bg_image"
          @load="createDecoration()"
        />
      </div>

      <div
        class="portrait:ml-8 portrait:flex portrait:h-full w-full items-center pr-2 bottom-0 top-0 landscape:p-4 relative"
      >
        <p
          class="flex-1 line-clamp-1 text-xs landscape:text-base landscape:mt-4 landscape:text-white"
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
const musicNowCover =
  "https://pan.yiru.love/project-zhiyuanpalace/uploads/music/cover/本兮 - 有心无意.jpg";

const bg_image = ref();
watch(bg_image, (newValue: any) => {
  if (newValue) {
    createDecoration();
  }
});
const createDecoration = () => {
  const img = bg_image.value;
  if (img) {
    const rgb = increaseSaturation(
      adjustBrightnessWhilePreservingHue(getImageColor(img), 60, 60),
      5
    );
    const themeColorTranslucent = `rgba(${rgb},0.2)`;
    const themeColor = `rgb(${rgb})`;
    const themeColorRGB = `${rgb}`;
    document.body.setAttribute(
      "style",
      `--theme-color-translucent: ${themeColorTranslucent};--theme-color: ${themeColor};--theme-color-rgb: ${themeColorRGB};`
    );
  }
};
</script>
