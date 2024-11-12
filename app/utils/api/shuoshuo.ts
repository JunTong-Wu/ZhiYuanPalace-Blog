export const ApiShuoShuo = {
  /**
   * 查询说说列表
   */
  getShuoshuoList(params: any) {
    return ApiService.post("/shuoshuo/index", params);
  },
  /**
   * 查询单条说说
   */
  showShuoshuo(params: any) {
    return ApiService.post(`/shuoshuo/show`, params);
  },
};
