export default interface ApiDataTypes {
  res: globalThis.Ref<any>;
  pending: globalThis.Ref<any>;
  error: globalThis.Ref<any>;
  refresh: any;
}
/**
 * 查询所有说说
 */
export const search_shuoshuos_all = () => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    '/shuoshuo/search_shuoshuos_all',
    null
  );
  return value;
};
/**
 * 分页查询说说
 */
export const search_shuoshuos_all_paging = (parameter: object) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    '/shuoshuo/search_shuoshuos_all_paging',
    parameter
  );
  return value;
};
/**
 * 根据合集名查询说说
 */
export const search_shuoshuos_by_collection_path = (
  collection_path: string
) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/shuoshuo/search_shuoshuos_by_collection_path/${collection_path}`,
    null
  );
  return value;
};
/**
 * 根据合集名查询说说（分页）
 */
export const search_shuoshuos_by_collection_path_paging = (
  collection_path: string,
  parameter: object
) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/shuoshuo/search_shuoshuos_by_collection_path_paging/${collection_path}`,
    parameter
  );
  return value;
};
/**
 * 根据 ID 查询说说
 */
export const search_shuoshuo_by_id = (id: string | number) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/shuoshuo/search_shuoshuo_by_id/${id}`,
    null
  );
  return value;
};
/**
 * 根据说说合集名查询合集的标题
 */
export const search_collection_title_by_collection_path = (
  collection_path: string
) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/shuoshuo/search_collection_title_by_collection_path/${collection_path}`,
    null
  );
  return value;
};
/**
 * 查询说说合集列表
 */
export const search_collection_list = () => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    '/shuoshuo/search_collection_list',
    null
  );
  return value;
};
