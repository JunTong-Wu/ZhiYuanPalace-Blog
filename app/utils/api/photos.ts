export const ApiPhotos = {
    search_album_list() {
        return useMyFetch("get", "/photos/search_album_list", null);
    },
}