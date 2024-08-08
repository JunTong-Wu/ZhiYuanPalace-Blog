<template>
  <div class="overflow-hidden">
    <div class="zy-album-card transition-in">
      <ZyFetchLoading :fetchData="(albumDetail as any)">
        <template v-slot:loading></template>
        <template v-slot:onload="{ row: item }">
          <div class="zy-album-card-inner dark">
            <div class="zy-card-title">
              <div class="h-full flex flex-col justify-center">
                <h4
                    class="m-0 portrait:text-lg landscape:text-xl portrait:font-normal landscape:font-bold line-clamp-1 text-white"
                >
                  {{ item.album_title }}
                </h4>
              </div>
            </div>
            <div class="zy-card-image">
              <img
                  :src="`https://pan.yiru.love${item.album_cover}`"
                  alt=""
              />
            </div>
          </div>
        </template>
      </ZyFetchLoading>
    </div>
    <Toolbar />
  </div>
</template>
<script setup lang="ts">
import {ApiPhotos} from "~/utils";

useHead({
  title: "相册详情",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-album-details",
  },
});
definePageMeta({
  pageTransition: {
    name: "third-layer",
    mode: "out-in",
  },
  middleware: "transition",
});

const route = useRoute();
const path = route.params.path as string;

// 获取相册内容
const albumDetail = ApiPhotos.search_album_title_by_album_path(path);
const albumData = ApiPhotos.search_photos_by_album_path(path);
</script>
<style>
@import url("~/components/layout/AlbumCard/AlbumCard.scss");
</style>