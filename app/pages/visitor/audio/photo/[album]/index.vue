<template>
  <div class="overflow-hidden">
    <div class="zy-album-card transition-in">
      <ZyFetchLoading
        :fetchData="albumDetailDataLazyFetch"
        @fetchOnload="showAlbumDetail"
      >
        <template #loading></template>
        <template #onload>
          <div class="zy-album-card-inner">
            <div class="zy-card-title">
              <div class="h-full flex flex-col justify-center">
                <h4
                  class="m-0 portrait:text-sm landscape:text-base portrait:font-normal line-clamp-1"
                >
                  {{ albumDetailData.album_title }}
                </h4>
              </div>
            </div>
            <div class="zy-card-image">
              <ZyImage
                :src="`${cdnUrl}${albumDetailData.album_cover}`"
                :locked="albumDetailData.has_password"
                alt=""
              />
            </div>
          </div>
        </template>
      </ZyFetchLoading>
    </div>
    <div class="album-data-grid">
      <ZyFetchLoading
        :fetchData="photoListLazyFetch"
        @fetchOnload="showPhotoDetail"
      >
        <template #loading>test</template>
        <template #onload>
          <div v-if="albumHasPasswordFlag">
            <PassWordModel
              type="album"
              :id="albumDetailData.album_id"
              @validate-success="getPhotosWithPassword"
            >
            </PassWordModel>
          </div>
          <ul
            v-else
            class="row-photo"
          >
            <li
              class="clo-photo-card"
              v-for="item in photoList.list"
            >
              <div>
                <ZyLazyImage
                  className="w-full rounded-none overflow-hidden aspect-square"
                  :src="`${cdnUrl}${item.photo_thumbnail_path}`"
                  :sourceSrc="`${cdnUrl}${item.photo_source_path}`"
                  alt=""
                  preview
                />
              </div>
            </li>
          </ul>
        </template>
      </ZyFetchLoading>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { photo } from '@@/models';
  type Photo = photo.Photo;
  type AlbumListModelType = photo.PhotoAlbumList;
  type AlbumModelType = photo.PhotoAlbum;
  type PhotoListModelType = photo.PhotoList;

  const { setPostInfo, clearPostInfo } = toRefs(store.usePostInfo());
  const setHeaderTitle = (id: number, title: string) => {
    setPostInfo.value(id, 'album', title);
  };

  const route = useRoute();
  const albumPath = route.params.album as string;
  const albumHasPasswordFlag = ref(false);

  const getPhotosListLazyFetch = async (password?: string) => {
    if (password) {
      return await ApiPhotos.getPhotosList({
        album_path: albumPath,
        album_password: password,
      });
    }
    return await ApiPhotos.getPhotosList({ album_path: albumPath });
  };

  // 获取相册标题
  const albumDetailData = ref<AlbumModelType>(new photo.PhotoAlbum());
  const albumDetailDataLazyFetch = await ApiPhotos.getAlbumsList({
    album_path: albumPath,
  });
  const showAlbumDetail = (result: ResOptionsModelType<AlbumListModelType>) => {
    albumDetailData.value = result.data.list[0] as AlbumModelType;
  };

  // 获取相册详细
  const photoList = ref<PhotoListModelType>(new photo.PhotoList());
  let photoListLazyFetch = await getPhotosListLazyFetch();

  // 获取加密的相册详细
  const getPhotosWithPassword = async (params: { password: string }) => {
    photoListLazyFetch = await getPhotosListLazyFetch(params.password);
  };

  const displayPasswordEnter = (photos: Photo[]) => {
    const albumHasPassword = photos.some((item) => {
      return item.album_has_password;
    });
    if (albumHasPassword) {
      albumHasPasswordFlag.value = true;
    } else {
      albumHasPasswordFlag.value = false;
    }
  };

  const showPhotoDetail = (result: ResOptionsModelType<PhotoListModelType>) => {
    photoList.value = result.data;
    displayPasswordEnter(result.data.list as Photo[]);
    setHeaderTitle(
      albumDetailData.value.album_id,
      albumDetailData.value.album_title,
    );
  };

  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;

  onUnmounted(() => {
    clearPostInfo.value();
  });
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
