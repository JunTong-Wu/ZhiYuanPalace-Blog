<template>
  <aside id="zy-music-bar" h-music>
    <div relative h-full flex items-center color="text-2">
      <div h="[120%]" flex relative>
        <img h="[90%]" absolute bottom="[5%]" drop-shadow-md left-5 src="@/assets/image/record-128.png" alt=""
          srcset="" />
        <img h-full relative left-0 rounded-md shadow-md :src="musicNowCover" alt="" srcset="" ref="bg_image"
          @load="createDecoration()" />
      </div>
      <div ml-6 color="text-1" flex h-full w-full items-center pr-2>
        <span flex-1 line-clamp-1 text-xs>你说的话 有心的吗 刺痛我了 无意的吧</span>
        <div flex>
          <div class="horizontal-layout">
            <ZyButton h-music aspect-square title="上一曲" type="transparent">
              <ZyIcon size="1rem" defaultName="music-prev" />
            </ZyButton>
          </div>
          <ZyButton h-music aspect-square title="播放" type="transparent">
            <ZyIcon size="1rem" defaultName="music-play" />
          </ZyButton>
          <div class="horizontal-layout">
            <ZyButton h-music aspect-square title="下一曲" type="transparent">
              <ZyIcon size="1rem" defaultName="music-next" />
            </ZyButton>
          </div>

          <ZyButton h-music aspect-square title="播放列表" type="transparent">
            <ZyIcon size="1rem" defaultName="music-list" />
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
    const rgb = adjustBrightnessWhilePreservingHue(getImageColor(img), 80, 80);
    const themeColorTranslucent = `rgba(${rgb},0.4)`;
    const themeColor = `rgb(${rgb})`;
    document.body.setAttribute('style', `--theme-color-translucent: ${themeColorTranslucent};--theme-color: ${themeColor}`)
  }
};
</script>
