export const ApiPhotos = {
  search_album_list() {
    return ApiService.post("/photos/search_album_list", null);
  },
  search_album_title_by_album_path(album_path: string) {
    return ApiService.post(
      `/photos/search_album_title_by_album_path/${album_path}`,
      null
    );
  },
  search_photos_by_album_path(album_path: string) {
    return ApiService.post(
      `/photos/search_photos_by_album_path/${album_path}`,
      null
    );
  },
};
