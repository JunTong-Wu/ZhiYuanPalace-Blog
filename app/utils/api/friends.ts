export const ApiFriend = {
  getFriendsList(): Promise<LazyAsyncDataRef<ResOptionsModelType<any>>> {
    return ApiService.post("/friends/index", null);
  },
};
