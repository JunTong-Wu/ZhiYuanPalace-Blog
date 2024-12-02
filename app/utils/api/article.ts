import { article } from "@@/models";

export const ArticleModel = article.Article;
export const ArticleListModel = article.ArticleList;

export type ArticleModelType = article.Article;
export type ArticleListModelType = article.ArticleList;

type ApiIndexModelType = article.ApiIndex;
type ApiShowModelType = article.ApiShow;

export const ApiArticle = {
  /**
   * 查询文章列表
   */
  getArticlesList(
    params: ApiIndexModelType["params"] | null
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<ArticleModelType>>> {
    return ApiService.post("/articles/index", params);
  },
  /**
   * 查询单篇文章
   */
  showArticle(
    params: ApiShowModelType["params"]
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<ArticleModelType>>> {
    return ApiService.post(`/articles/show`, params);
  },
  /**
   * 文章密码验证
   */
  passwordVerify(
    params: any
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<null>>> {
    return ApiService.post("/articles/password-verify", params);
  },
};
