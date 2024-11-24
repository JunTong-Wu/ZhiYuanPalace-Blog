<template>
  <CommonMainSection>
    <ZyFetchLoading :fetchData="albumListDataLazyFetch" @fetchOnload="showAlbumList">
      <template #loading>
        <ul class="row-album">
          <li class="clo-album-card" v-for="n in 12">
            <AlbumCard skeleton class="rounded">
              <template #image>
                <ZySkeleton type="image" />
              </template>
              <template #title>
                <ZySkeleton :row="2" />
              </template>
            </AlbumCard>
          </li>
        </ul>
      </template>
      <template #onload>
        <ul class="row-album">
          <li class="clo-album-card" v-for="item in albumListData">
            <AlbumCard :href="`/audio/photo/${item.album_path}`" class="sm:rounded">
              <template #image>
                <ZyLazyImage :src="`${cdnUrl}${item.album_cover}`" alt="" />
              </template>
              <template #title>
                <div class="h-full flex flex-col justify-center">
                  <h4
                    class="m-0 portrait:text-sm landscape:text-xl portrait:font-normal landscape:font-bold line-clamp-1 text-white">
                    {{ item.album_title }}
                  </h4>
                </div>
              </template>
            </AlbumCard>
          </li>
        </ul>
      </template>
    </ZyFetchLoading>
    <Toolbar />
  </CommonMainSection>
</template>
<script setup lang="ts">
import { ApiPhotos } from "~/utils";

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
const albumListDataLazyFetch = await ApiPhotos.getAlbumsList(null);
const albumListData = ref<AlbumListItem[]>();
const showAlbumList = (result: ResOptions<AlbumList>) => {
  albumListData.value = result.data.list;
};
const config = useRuntimeConfig();
const cdnUrl = config.public.CDN_URL;
</script>
