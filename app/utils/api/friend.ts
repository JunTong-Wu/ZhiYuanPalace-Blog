export const ApiFriend = {
  search_friends_all() {
    return ApiService.get("/friends/search_friends_all", null);
  },
};
