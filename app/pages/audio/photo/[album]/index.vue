<template>
  <div class="overflow-hidden">
    <div class="zy-album-card transition-in">
      <ZyFetchLoading :fetchData="(albumDetailData as any)">
        <template v-slot:loading></template>
        <template v-slot:onload="{ row: item }">
          <div class="zy-album-card-inner dark">
            <div class="zy-card-title">
              <div class="h-full flex flex-col justify-center">
                <h4
                  class="m-0 portrait:text-sm landscape:text-xl portrait:font-normal landscape:font-bold line-clamp-1 text-white"
                >
                  {{ item.album_title }}
                </h4>
              </div>
            </div>
            <div class="zy-card-image">
              <ZyLazyImage :src="`https://pan.yiru.love${item.album_cover}`" alt=""/>
            </div>
          </div>
        </template>
      </ZyFetchLoading>
    </div>
    <CommonMainSection noPaddingTop class="album-data-grid">
      <ZyFetchLoading
          :fetchData="(albumData as any)"
          rowClass="grid grid-cols-12 portrait:gap-2 portrait:xs:gap-4 gap-4"
          cloClass="
      portrait:col-span-4 landscape:col-span-4
      portrait:xs:col-span-4 landscape:xs:col-span-4
      portrait:sm:col-span-4 landscape:sm:col-span-4
      portrait:md:col-span-3 landscape:md:col-span-3
      portrait:lg:col-span-3 landscape:lg:col-span-3
      portrait:xl:col-span-3 landscape:xl:col-span-3
      ">
        <template v-slot:loading>test</template>
        <template v-slot:onload="{ row: item }">
          <div>
            <ZyLazyImage
              className="w-full rounded-lg overflow-hidden aspect-square"
              :src="`https://pan.yiru.love${item.photo_thumbnail_path}`"
              :sourceSrc="`https://pan.yiru.love${item.photo_source_path}`"
              alt=""
              preview
            />
          </div>
        </template>
      </ZyFetchLoading>
    </CommonMainSection>

    <Toolbar />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "相册详情",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-album-details",
  },
});
definePageMeta({
  layout: "default",
  layoutTransition: {
    mode: "out-in",
  },
  pageTransition: {
    name: "third-layer",
    mode: "out-in",
  },
  middleware: "transition",
});

const route = useRoute();
const albumPath = route.params.album as string;

// 获取相册内容
const albumDetailData = ApiPhotos.search_album_title_by_album_path(albumPath);
const albumData = ApiPhotos.search_photos_by_album_path(albumPath);
</script>
<style>
@import url("~/components/layout/AlbumCard/AlbumCard.scss");
@keyframes an-album-data-grid {
  0% {
    transform: translateY(10rem);
    opacity: 0;
  }

  100% {
    transform: translateY(0rem);
    opacity: 1;
  }
}

.album-data-grid {
  animation: an-article-card-text 400ms;
}
</style>
