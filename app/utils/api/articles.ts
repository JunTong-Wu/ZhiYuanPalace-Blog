import { article } from "@@/models";

type ArticleModelType = article.Article;
type ArticleListModelType = article.ArticleList;

type ApiIndexModelType = article.ApiIndex;
type ApiShowModelType = article.ApiShow;
type ApiUpdateModelType = article.ApiUpdate;
type ApiAddModelType = article.ApiAdd;

export const ApiArticle = {
  /**
   * 查询文章列表
   */
  getArticlesList(
    params: ApiIndexModelType["params"] | null,
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<ArticleListModelType>>> {
    return ApiService.post("/articles/index", params);
  },
  /**
   * 查询单篇文章
   */
  showArticle(
    params: ApiShowModelType["params"],
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<ArticleModelType>>> {
    return ApiService.post(`/articles/show`, params);
  },
  /**
   * 文章密码验证
   */
  passwordVerify(
    params: any,
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<any>>> {
    return ApiService.post("/articles/password-verify", params);
  },
  /**
   * 编辑单篇文章
   */
  updateArticle(
    params: ApiUpdateModelType["params"],
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<any>>> {
    return ApiService.post(`/articles/update`, params);
  },
  /**
   * 添加单篇文章
   */
  addArticle(
    params: ApiAddModelType["params"],
  ): Promise<LazyAsyncDataRef<ResOptionsModelType<any>>> {
    return ApiService.post(`/articles/add`, params);
  },
};
