export const ApiFriend = {
  search_friends_all() {
    return ApiService.post("/friends", null);
  },
};
