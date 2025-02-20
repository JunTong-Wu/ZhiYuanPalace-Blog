export const ApiSearch = {
  /**
   * 全局搜索
   */
  search(param: any) {
    return ApiService.post('/search', param);
  },
};
