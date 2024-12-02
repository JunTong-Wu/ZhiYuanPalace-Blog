import { photo } from "@@/models";

export const PhotoModel = photo.Photo;
export const PhotoListModel = photo.PhotoList;
export const AlbumModel = photo.PhotoAlbum;
export const AlbumListModel = photo.PhotoAlbumList;

export type PhotoModelType = photo.Photo;
export type PhotoListModelType = photo.PhotoList;
export type AlbumModelType = photo.PhotoAlbum;
export type AlbumListModelType = photo.PhotoAlbumList;
export type ApiIndexModelType = photo.ApiIndex;
export type ApiAlbumModelType = photo.ApiAlbum;

export const ApiPhotos = {
  /**
   * 查询相册列表
   */
  getAlbumsList(
    params: any
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<AlbumListModelType>>> {
    return ApiService.post("/photos/albums", params);
  },
  /**
   * 查询照片列表
   */
  getPhotosList(
    params: any
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<PhotoListModelType>>> {
    return ApiService.post("/photos/index", params);
  },
};
