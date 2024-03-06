<template>
  <aside id="zy-music-bar" h-music>
    <div
      relative
      h-full
      w="[90%]"
      mx-auto
      flex
      items-center
      color="text-2"
      :style="`background:${bg_color}`"
      rounded-3xl
    >
      <div h="[130%]" absolute bottom="[-2%]">
        <img
          h="[90%]"
          absolute
          bottom="[2%]"
          left-5
          src="@/assets/image/record-128.png"
          alt=""
          srcset=""
        />
        <img
          h-full
          absolute
          rounded-md
          shadow-md
          :src="musicNowCover"
          alt=""
          srcset=""
          ref="bg_image"
          @load="createDecoration()"
        />
      </div>
      <div
        ml-2
        class="dark"
        color="text-1"
        flex
        h-full
        w-full
        items-center
        pr-4
      >
        <div h="[130%]" aspect-square mr-5></div>
        <span flex-1 line-clamp-1>你说的话 有心的吗 刺痛我了 无意的吧</span>
        <div flex>
          <div class="horizontal-layout">
            <zy-button
              h-music
              aspect-square
              title="上一曲"
              type="transparent"
            >
              <ZyIcon size="1.2rem" defaultName="music-prev" />
            </zy-button>
          </div>
          <zy-button h-music aspect-square title="播放" type="transparent">
            <ZyIcon size="2.5rem" defaultName="music-play" />
          </zy-button>
          <div class="horizontal-layout">
            <zy-button
              h-music
              aspect-square
              title="下一曲"
              type="transparent"
            >
              <ZyIcon size="1.2rem" defaultName="music-next" />
            </zy-button>
          </div>

          <zy-button h-music aspect-square title="播放列表" type="transparent">
            <ZyIcon size="1.2rem" defaultName="music-list" />
          </zy-button>
        </div>
      </div>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { getImageColor, darkenRgb } from "@/models/common/function";
const musicNowCover =
  "https://pan.yiru.love/project-zhiyuanpalace/uploads/music/cover/本兮 - 有心无意.jpg";

const bg_image = ref();
watch(bg_image, (newValue) => {
  createDecoration();
});
const bg_color = ref("");
const createDecoration = () => {
  const img = bg_image.value;
  if (img) {
    const rgb = darkenRgb(getImageColor(img));
    bg_color.value = `rgb(${rgb})`;
  }
};
watch(bg_color, (newValue) => {
  if (newValue != "hsl(0,0%,0%)") {
    console.log(newValue);
  }
});
</script>
