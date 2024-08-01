<template>
  <aside id="zy-music-bar" class="h-music">
    <div class="fixed top-0 landscape:right-0 w-toolbar z-0 pt-header bg-bg-opaque portrait:hidden">
      <div class="h-64"></div>
    </div>
    <div class="relative z-10 h-full portrait:flex items-center landscape:bg-bg-bestCard">
      <div class="flex relative h-[120%] landscape:h-16 landscape:left-4 landscape:top-4">
        <img
          class="h-[90%] absolute bottom-[5%] drop-shadow-md left-5 landscape:hidden"
          src="@/assets/image/record-128.png"
          alt=""
          srcset=""
        />
        <img
          class="h-full relative left-0 rounded-md portrait:shadow-md landscape:rounded-xl"
          :src="musicNowCover"
          alt=""
          srcset=""
          ref="bg_image"
          @load="createDecoration()"
        />
      </div>
      <div class="absolute top-0 right-0 w-full h-full z-0 overflow-hidden portrait:hidden">
        <div class="absolute -top-8 right-12 w-28 h-28">
          <div class="w-full h-full rounded-full bg-theme"></div>
        </div>
        <div class="absolute -top-8 -right-8 w-28 h-28 invert -hue-rotate-15 mix-blend-multiply">
          <div class="w-full h-full rounded-full bg-theme"></div>
        </div>
        <div class="absolute top-3 right-3 w-3 h-3 rounded-tr-md overflow-hidden">
          <div class="w-full h-full rounded-tr-md border-t-2 border-r-2"></div>
        </div>
      </div>
      <div class="portrait:ml-8 portrait:flex portrait:h-full w-full items-center pr-2 bottom-0 top-0 landscape:p-4">
        <p class="flex-1 line-clamp-1 text-xs landscape:text-base landscape:mt-4"
          >你说的话 有心的吗 刺痛我了 无意的吧</p
        >
        <div class="flex landscape:absolute bottom-0 left-0 right-0 landscape:p-4 landscape:justify-around">
          <div class="portrait:hidden order-2">
            <ZyButton
              class="portrait:h-music aspect-square"
              title="上一曲"
              type="transparent"
            >
              <ZyIcon class="landscape:hidden" size="1rem" defaultName="music-prev" />
              <ZyIcon class="portrait:hidden" size="1.5rem" defaultName="music-prev" />
            </ZyButton>
          </div>
          <div class="order-3">
            <ZyButton
                class="portrait:h-music aspect-square"
                title="播放"
                type="transparent"
            >
              <ZyIcon class="landscape:hidden" size="1rem" defaultName="music-play" />
              <ZyIcon class="portrait:hidden invert -hue-rotate-15" size="2.5rem" defaultName="music-play" defaultColor="var(--theme-color)" />
            </ZyButton>
          </div>
          <div class="portrait:hidden order-4">
            <ZyButton
              class="portrait:h-music aspect-square"
              title="下一曲"
              type="transparent"
            >
              <ZyIcon class="landscape:hidden" size="1rem" defaultName="music-next" />
              <ZyIcon class="portrait:hidden" size="1.5rem" defaultName="music-next" />
            </ZyButton>
          </div>
          <div class="order-4 landscape:order-1">
            <ZyButton
                class="portrait:h-music aspect-square"
                title="播放列表"
                type="transparent"
            >
              <ZyIcon class="landscape:hidden" size="1rem" defaultName="music-list" />
              <ZyIcon class="portrait:hidden" size="1.25rem" defaultName="music-list" />
            </ZyButton>
          </div>
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
    const rgb = increaseSaturation(adjustBrightnessWhilePreservingHue(getImageColor(img), 60, 60),5);
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
