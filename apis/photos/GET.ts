export default interface ApiDataTypes {
  res: globalThis.Ref<any>;
  pending: globalThis.Ref<any>;
  error: globalThis.Ref<any>;
  refresh: any;
}
/**
 * 查询所有照片
 */
export const search_photos_all = () => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    '/photos/search_photos_all',
    null
  );
  return value;
};
/**
 * 根据相册名查询照片
 */
export const search_photos_by_album_path = (album_path: string) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/photos/search_photos_by_album_path/${album_path}`,
    null
  );
  return value;
};
/**
 * 根据 ID 查询文章
 */
export const search_photo_by_id = (id: string | number) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/photos/search_photo_by_id/${id}`,
    null
  );
  return value;
};
/**
 * 根据 ID 查询照片原图路径
 */
export const search_photo_source_path_by_id = (id: string | number) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/photos/search_photo_source_path_by_id/${id}`,
    null
  );
  return value;
};
/**
 * 根据相册名查询相册的标题
 */
export const search_album_title_by_album_path = (album_path: string) => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    `/photos/search_album_title_by_album_path/${album_path}`,
    null
  );
  return value;
};
/**
 * 查询文章分类列表
 */
export const search_album_list = () => {
  const value: ApiDataTypes = useMyFetch(
    'get',
    '/photos/search_album_list',
    null
  );
  return value;
};
