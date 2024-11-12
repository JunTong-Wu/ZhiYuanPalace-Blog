export const ApiPhotos = {
  /**
   * 查询相册列表
   */
  getAlbumsList(params: any) {
    return ApiService.post("/photos/albums", params);
  },
  /**
   * 查询照片列表
   */
  getPhotosList(params: any) {
    return ApiService.post("/photos/index", params);
  },
};
