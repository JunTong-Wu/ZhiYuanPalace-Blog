import type { AlbumList, PhotoList } from "../models/post/photo";

export const ApiPhotos = {
  /**
   * 查询相册列表
   */
  getAlbumsList(params: any): Promise<LazyAsyncDataRef<ResOptions<AlbumList>>> {
    return ApiService.post("/photos/albums", params);
  },
  /**
   * 查询照片列表
   */
  getPhotosList(params: any): Promise<LazyAsyncDataRef<ResOptions<PhotoList>>> {
    return ApiService.post("/photos/index", params);
  },
};
