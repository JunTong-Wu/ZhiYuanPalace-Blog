export const ApiArticle = {
  /**
   * 查询文章列表
   */
  getArticles(params: any) {
    return ApiService.post("/articles", params);
  },
  /**
   * 查询单篇文章
   */
  getSingleArticle(id: string | number, params: any) {
    return ApiService.post(`/articles/${id}`, params);
  },
  /**
   * 文章密码验证
   */
  passwordVerify(params: any) {
    return ApiService.post("/articles/password_verify", params);
  },
};
