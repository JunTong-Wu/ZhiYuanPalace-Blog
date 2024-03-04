export default interface ApiDataTypes {
  res: globalThis.Ref<any>;
  pending: globalThis.Ref<any>;
  error: globalThis.Ref<any>;
  refresh: any;
}
/**
 * 查询所有朋友
 */
export const search_friends_all = () => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    '/friends/search_friends_all',
    null
  );
  return value;
};
/**
 * 根据合集名查询朋友
 */
export const search_friends_by_collection_path = (collection_path: string) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/friends/search_friends_by_collection_path/${collection_path}`,
    null
  );
  return value;
};
/**
 * 根据 ID 查询朋友
 */
export const search_friend_by_id = (id: string | number) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/friends/search_friend_by_id/${id}`,
    null
  );
  return value;
};
/**
 * 根据 ID 查询朋友的标题
 */
export const search_friend_title_by_id = (id: string | number) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/friends/search_friend_title_by_id/${id}`,
    null
  );
  return value;
};
/**
 * 根据朋友合集名查询合集的标题
 */
export const search_collection_title_by_collection_path = (
  collection_path: string
) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/friends/search_collection_title_by_collection_path/${collection_path}`,
    null
  );
  return value;
};
/**
 * 查询朋友合集列表
 */
export const search_collection_list = () => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    '/friends/search_collection_list',
    null
  );
  return value;
};
