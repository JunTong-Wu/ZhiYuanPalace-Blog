import { photo } from "@@/models";
import { photoPasswordFilter } from "~~/server/utils/helper";
import { loginVerify } from "~~/server/utils/helper/loginVerify";
type ApiIndexModelType = photo.ApiIndex;

/**
 * 查询照片列表
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiIndexModelType["params"];
  const pageNumer = Number(body.page_numer || -1);
  const pageSize = Number(body.page_size || -1);
  const albumPath = body.album_path || null;
  const albumPassword = body.album_password || null;

  // 验证 JWT 令牌
  const isLoggedIn = loginVerify(event);

  const sql =
    "SELECT * \n" +
    "FROM photos \n" +
    "JOIN photo_albums ON photos.photo_album_id = photo_albums.album_id \n" +
    "WHERE photo_albums.album_private!= 1\n" +
    (albumPath ? "AND photo_albums.album_path = ?" : "") +
    "ORDER BY photos.photo_id DESC\n" +
    (pageNumer !== -1 && pageSize !== -1 ? "LIMIT ?,?;" : ";");

  let values = [];
  if (albumPath) {
    values.push(albumPath);
  }
  if (pageNumer !== -1 && pageSize !== -1) {
    const pageLimit = pageNumer == 1 ? 0 : (pageNumer - 1) * pageSize;
    values.push(pageLimit, pageSize);
  }

  let dbResults = await getHandledQuery(sql, values);
  let total = 0;

  if (dbResults.code === 0 && dbResults.data && dbResults.data.length > 0) {
    dbResults = photoPasswordFilter(dbResults, albumPassword, isLoggedIn);
    total = dbResults.data.length;
    return setJson(
      { data: { list: dbResults.data, total: total } },
      dbResults,
    ) as ApiIndexModelType["result"];
  } else {
    return dbResults;
  }
});
