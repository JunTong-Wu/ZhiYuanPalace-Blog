export const ApiArticle = {
  /**
   * 查询文章列表
   */
  getArticlesList(params: any) {
    return ApiService.post("/articles/index", params);
  },
  /**
   * 查询单篇文章
   */
  showArticle(params: any) {
    return ApiService.post(`/articles/show`, params);
  },
  /**
   * 文章密码验证
   */
  passwordVerify(params: any) {
    return ApiService.post("/articles/password-verify", params);
  },
};
