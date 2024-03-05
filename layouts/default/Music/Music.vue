<template>
  <aside
    id="zy-music-bar"
    h-music
    overflow-hidden
    :style="`background:${bg_color}`"
  >
    <div h-full w-full flex items-center color="text-2">
      <div h-full>
        <img
          h-full
          :src="musicNowCover"
          alt=""
          srcset=""
          ref="bg_image"
          @load="createDecoration()"
        />
      </div>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { getImageColor,darkenRgb } from "@/models/common/function";
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
    const rgba = [rgb[0], rgb[1], rgb[2], 0.9];
    bg_color.value = `rgba(${rgba})`;
  }
};
watch(bg_color, (newValue) => {
  if (newValue != "hsl(0,0%,0%)") {
    console.log(newValue);
  }
});
</script>
