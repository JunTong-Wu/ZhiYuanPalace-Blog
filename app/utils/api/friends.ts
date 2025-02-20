export const ApiFriend = {
  getFriendsList() {
    return ApiService.post('/friends/index', null);
  },
};
