<template>
  <div class="overflow-hidden">
    <div class="zy-album-card transition-in">
      <ZyFetchLoading :fetchData="albumDetailDataLazyFetch" @fetchOnload="showAlbumDetail">
        <template #loading></template>
        <template #onload>
          <div class="zy-album-card-inner dark">
            <div class="zy-card-title">
              <div class="h-full flex flex-col justify-center">
                <h4
                  class="m-0 portrait:text-sm landscape:text-xl portrait:font-normal landscape:font-bold line-clamp-1 text-white">
                  {{ albumDetailData.album_title }}
                </h4>
              </div>
            </div>
            <div class="zy-card-image">
              <ZyLazyImage :src="`${cdnUrl}${albumDetailData.album_cover}`" alt="" />
            </div>
          </div>
        </template>
      </ZyFetchLoading>
    </div>
    <CommonMainSection noPaddingTop class="album-data-grid">
      <ZyFetchLoading :fetchData="photoListLazyFetch" @fetchOnload="showPhotoDetail">
        <template #loading>test</template>
        <template #onload>
          <ul class="row-photo">
            <li class="clo-photo-card" v-for="item in photoList">
              <div>
                <ZyLazyImage className="w-full rounded-none overflow-hidden aspect-square"
                  :src="`${cdnUrl}${item.photo_thumbnail_path}`" :sourceSrc="`${cdnUrl}${item.photo_source_path}`" alt=""
                  preview />
              </div>
            </li>
          </ul>
        </template>
      </ZyFetchLoading>
    </CommonMainSection>

    <Toolbar />
  </div>
</template>
<script setup lang="ts">
const { setPostInfo } = toRefs(
  store.usePostInfo()
);
const setHeaderTitle = (id: number, title: string) => {
  setPostInfo.value(id, "album", title)
}

const route = useRoute();
const albumPath = route.params.album as string;

// 获取相册内容
const albumDetailDataLazyFetch = await ApiPhotos.getAlbumsList({ album_path: albumPath });
const photoListLazyFetch = await ApiPhotos.getPhotosList({ album_path: albumPath });
const albumDetailData = ref<AlbumListItem>({ ...AlbumListItemData });
const photoList = ref<PhotoListItem[]>();
const showAlbumDetail = (result: ResOptions<AlbumList>) => {
  albumDetailData.value = result.data.list[0] as AlbumListItem;
}
const showPhotoDetail = (result: ResOptions<PhotoList>) => {
  photoList.value = result.data.list;
  setHeaderTitle(albumDetailData.value.album_id, albumDetailData.value.album_title);
}
const config = useRuntimeConfig();
const cdnUrl = config.public.CDN_URL;
</script>
<style>
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
