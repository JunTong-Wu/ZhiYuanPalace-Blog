/**
 * 查询照片列表
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pageNumer = Number(body.page_numer || -1);
  const pageSize = Number(body.page_size || -1);
  const albumPath = body.album_path || null;

  const sql =
    "SELECT * \n" +
    "FROM photos \n" +
    "JOIN photo_albums ON photos.photo_album_id = photo_albums.album_id \n" +
    (albumPath ? "WHERE photo_albums.album_path = ?" : "") +
    "ORDER BY photos.photo_id DESC\n" +
    (pageNumer !== -1 && pageSize !== -1 ? "LIMIT?,?;" : ";");

  let values = [];
  if (albumPath) {
    values.push(albumPath);
  }
  if (pageNumer !== -1 && pageSize !== -1) {
    const pageLimit = pageNumer == 1 ? 0 : (pageNumer - 1) * pageSize;
    values.push(pageLimit, pageSize);
  }

  return await getHandledQuery(sql, values);
});
