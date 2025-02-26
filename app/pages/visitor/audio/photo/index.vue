<template>
  <CommonMainSection>
    <UCard>
      <ZyFetchLoading
        :fetchData="albumListDataLazyFetch"
        @fetchOnload="showAlbumList"
      >
        <template #loading>
          <ul class="row-album">
            <li
              class="clo-album-card"
              v-for="n in 12"
            >
              <AlbumCard
                skeleton
                class="rounded"
              >
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
            <li
              class="clo-album-card"
              v-for="item in albumListData.list"
            >
              <AlbumCard
                :href="`/audio/photo/${item.album_path}`"
                class="sm:rounded"
              >
                <template #image>
                  <ZyLazyImage
                    :src="`${cdnUrl}${item.album_cover}`"
                    :locked="item.has_password"
                    alt=""
                  />
                </template>
                <template #title>
                  <div class="h-full flex flex-col justify-center">
                    <h4
                      class="m-0 portrait:text-sm landscape:text-base portrait:font-normal line-clamp-1"
                    >
                      {{ item.album_title }}
                    </h4>
                  </div>
                </template>
              </AlbumCard>
            </li>
          </ul>
        </template>
      </ZyFetchLoading>
    </UCard>
  </CommonMainSection>
</template>
<script setup lang="ts">
  import { photo } from "@@/models";
  type AlbumListModelType = photo.PhotoAlbumList;

  // 获取相册列表
  const albumListDataLazyFetch = await ApiPhotos.getAlbumsList(null);
  const albumListData = ref<AlbumListModelType>(new photo.PhotoAlbumList());
  const showAlbumList = (result: ResOptionsModelType<AlbumListModelType>) => {
    albumListData.value = result.data;
  };
  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;
</script>
