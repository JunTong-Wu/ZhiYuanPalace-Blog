export const ApiShuoShuo = {
  search_shuoshuo_all() {
    return useMyFetch("get", "/shuoshuo/search_shuoshuos_all", null);
  },
  search_shuoshuo_by_id(id: string | number) {
    return useMyFetch("get", `/shuoshuo/search_shuoshuo_by_id/${id}`, null);
  },
};
