export default interface ApiDataTypes {
  res: globalThis.Ref<any>;
  pending: globalThis.Ref<any>;
  error: globalThis.Ref<any>;
  refresh: any;
}
/**
 * 查询所有文章
 */
export const search_articles_all = () => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    '/articles/search_articles_all',
    null
  );
  return value;
};
/**
 * 分页查询文章
 */
export const search_articles_all_paging = (parameter: object) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    '/articles/search_articles_all_paging',
    parameter
  );
  return value;
};
/**
 * 根据分类名查询文章
 */
export const search_articles_by_classify_path = (classify_path: string) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/articles/search_articles_by_classify_path/${classify_path}`,
    null
  );
  return value;
};
/**
 * 根据分类名查询文章（分页）
 */
export const search_articles_by_classify_path_paging = (
  classify_path: string,
  parameter: object
) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/articles/search_articles_by_classify_path_paging/${classify_path}`,
    parameter
  );
  return value;
};
/**
 * 根据 ID 查询文章
 */
export const search_article_by_id = (id: string | number) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/articles/search_article_by_id/${id}`,
    null
  );
  return value;
};
/**
 * 根据 ID 查询文章的标题
 */
export const search_article_title_by_id = (id: string | number) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/articles/search_article_title_by_id/${id}`,
    null
  );
  return value;
};
/**
 * 根据文章分类名查询分类的标题
 */
export const search_classify_title_by_classify_path = (classify: string) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/articles/search_classify_title_by_classify_path/${classify}`,
    null
  );
  return value;
};
/**
 * 查询文章分类列表
 */
export const search_classify_list = () => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    '/articles/search_classify_list',
    null
  );
  return value;
};
