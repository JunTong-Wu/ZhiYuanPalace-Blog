<template>
  <CommonMainSection>
    <div
        class="grid grid-cols-12 gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8"
    >
      <div class="col-span-12">
        <div
            class="portrait:p-0 landscape:py-4 xs:py-4 sm:py-6 md:py-7 lg:py-8 pl-0 rounded-xl"
        >
          <h3
              class="col-span-12 m-0 font-normal landscape:font-bold text-base sm:text-xl lg:text-2xl pt-4"
          >
            所有相册
          </h3>
          <ZyFetchLoading
            :fetchData="(albumListData as any)"
            rowClass="grid grid-cols-12 gap-4 xs:gap-4 sm:gap-6 md:gap-7 lg:gap-8 mt-4 xs:mt-5 sm:mt-6 md:mt-7 lg:mt-8"
            cloClass="
            portrait:col-span-12 landscape:col-span-12
            portrait:xs:col-span-6 landscape:xs:col-span-6
            portrait:sm:col-span-6 landscape:sm:col-span-6
            portrait:md:col-span-4 landscape:md:col-span-4
            portrait:lg:col-span-4 landscape:lg:col-span-4
            portrait:xl:col-span-4 landscape:xl:col-span-3
            "
            :minLoadingNumber="12"
          >
            <template v-slot:loading>
              <AlbumCard skeleton class="rounded-xl">
                <template #image>
                  <ZySkeleton type="image" />
                </template>
                <template #title>
                  <ZySkeleton :row="3" />
                </template>
              </AlbumCard>
            </template>
            <template v-slot:onload="{ row: item }">
              <AlbumCard
                  :href="`/audio/photo/${item.album_path}`"
                  class="sm:rounded-xl"
              >
                <template #image>
                  <img
                      :src="`https://pan.yiru.love${item.album_cover}`"
                      alt=""
                  />
                </template>
                <template #title>
                  <div class="h-full flex flex-col justify-center">
                    <h4
                        class="m-0 portrait:text-lg landscape:text-xl portrait:font-normal landscape:font-bold line-clamp-1"
                    >
                      {{ item.album_title }}
                    </h4>
                  </div>
                </template>
              </AlbumCard>
            </template>
          </ZyFetchLoading>
        </div>
      </div>
    </div>
    <Toolbar />
  </CommonMainSection>
</template>
<script setup lang="ts">

import {ApiPhotos} from "~/utils";

useHead({
  title: "相册",
  meta: [{ name: "description", content: "知书达理，鸢飞鱼跃" }],
  bodyAttrs: {
    class: "page-photo",
  },
});
definePageMeta({
  pageTransition: {
    mode: "out-in",
  },
  middleware: "transition",
});

// 获取相册列表
const albumListData = ApiPhotos.search_album_list();
</script>
<style>
@import url("~/components/layout/AlbumCard/AlbumCard.scss");
</style>