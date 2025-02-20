import { photo } from '@@/models';
type ApiIndexModelType = photo.ApiIndex;

/**
 * 查询照片列表
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiIndexModelType['params'];
  const pageNumer = Number(body.page_numer || -1);
  const pageSize = Number(body.page_size || -1);
  const albumPath = body.album_path || null;

  const sql =
    'SELECT * \n' +
    'FROM photos \n' +
    'JOIN photo_albums ON photos.photo_album_id = photo_albums.album_id \n' +
    (albumPath ? 'WHERE photo_albums.album_path = ?' : '') +
    'ORDER BY photos.photo_id DESC\n' +
    (pageNumer !== -1 && pageSize !== -1 ? 'LIMIT ?,?;' : ';');

  let values = [];
  if (albumPath) {
    values.push(albumPath);
  }
  if (pageNumer !== -1 && pageSize !== -1) {
    const pageLimit = pageNumer == 1 ? 0 : (pageNumer - 1) * pageSize;
    values.push(pageLimit, pageSize);
  }

  const dbResults = await getHandledQuery(sql, values);
  let total = 0;
  if (dbResults.code === 0 && dbResults.data && dbResults.data.length > 0) {
    total = dbResults.data.length;
  }
  return setJson(
    { data: { list: dbResults.data, total: total } },
    dbResults,
  ) as ApiIndexModelType['result'];
});
