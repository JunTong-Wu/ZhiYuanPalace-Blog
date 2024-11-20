import type { ArticleListItem, ArticleList } from "../models/post/article";

export const ApiArticle = {
  /**
   * 查询文章列表
   */
  getArticlesList(
    params: any
  ): Promise<LazyAsyncDataRef<ResOptions<ArticleList>>> {
    return ApiService.post("/articles/index", params);
  },
  /**
   * 查询单篇文章
   */
  showArticle(
    params: any
  ): Promise<LazyAsyncDataRef<ResOptions<ArticleListItem>>> {
    return ApiService.post(`/articles/show`, params);
  },
  /**
   * 文章密码验证
   */
  passwordVerify(params: any): Promise<LazyAsyncDataRef<ResOptions<null>>> {
    return ApiService.post("/articles/password-verify", params);
  },
};
