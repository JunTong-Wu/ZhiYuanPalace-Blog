import { photo } from '@@/models';

type PhotoListModelType = photo.PhotoList;
type AlbumListModelType = photo.PhotoAlbumList;

type ApiIndexModelType = photo.ApiIndex;
type ApiAlbumModelType = photo.ApiAlbum;

export const ApiPhotos = {
  /**
   * 查询相册列表
   */
  getAlbumsList(
    params: ApiAlbumModelType['params'] | null,
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<AlbumListModelType>>> {
    return ApiService.post('/photos/albums', params);
  },
  /**
   * 查询照片列表
   */
  getPhotosList(
    params: ApiIndexModelType['params'] | null,
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<PhotoListModelType>>> {
    return ApiService.post('/photos/index', params);
  },
};
