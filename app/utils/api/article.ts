export const ApiArticle = {
  /**
   * 查询所有文章
   */
  search_articles_all() {
    return ApiService.get("/articles/search_articles_all", null);
  },
  /**
   * 分页查询文章
   */
  search_articles_all_paging(params: any) {
    return ApiService.get("/articles/search_articles_all_paging", params);
  },
  /**
   * 根据分类名查询文章
   */
  search_articles_by_classify_path(classify_path: string) {
    return ApiService.get(
      `/articles/search_articles_by_classify_path/${classify_path}`,
      null
    );
  },
  /**
   * 根据分类名查询文章（分页）
   */
  search_articles_by_classify_path_paging(
    classify_path: string,
    params: any
  ) {
    return ApiService.get(
      `/articles/search_articles_by_classify_path_paging/${classify_path}`,
        params
    );
  },
  /**
   * 根据 ID 查询文章
   */
  search_article_by_id(id: string | number) {
    return ApiService.get(`/articles/search_article_by_id/${id}`, null);
  },
  /**
   * 根据 ID 查询文章的标题
   */
  search_article_title_by_id(id: string | number) {
    return ApiService.get(
      `/articles/search_article_title_by_id/${id}`,
      null
    );
  },
  /**
   * 根据文章分类名查询分类的标题
   */
  search_classify_title_by_classify_path(classify: string) {
    return ApiService.get(
      `/articles/search_classify_title_by_classify_path/${classify}`,
      null
    );
  },
  /**
   * 查询文章分类列表
   */
  search_classify_list() {
    return ApiService.get("/articles/search_classify_list", null);
  },
};
