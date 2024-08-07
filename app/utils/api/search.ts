export const ApiSearch = {
  /**
   * 全局搜索
   */
  search(parameter: object) {
    return useMyFetch("get", "/search", parameter);
  },
};
