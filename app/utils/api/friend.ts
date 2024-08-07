export const ApiFriend = {
    search_friends_all() {
        return useMyFetch("get", "/friends/search_friends_all", null);
    },
}