/**
 * URL: /api/photos/albums/index
 * 请求方式: POST
 * 请求参数:
 *  - page_numer: 页码
 *  - page_size: 每页条数
 *  - album_path: 相册路径
 * 返回参数:
 *  - code: 状态码
 *  - message: 消息
 *  - data: 数据
 */

import { photo } from "~~/models";
import { albumPasswordFilter } from "~~/server/utils/helper";
import { loginVerify } from "~~/server/utils/helper/loginVerify";
type ApiAlbumModelType = photo.ApiAlbum;

/**
 * 查询相册列表
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiAlbumModelType["params"];
  const pageNumer = Number(body.page_numer || -1);
  const pageSize = Number(body.page_size || -1);
  const albumPath = body.album_path || null;

  // 验证 JWT 令牌
  const isLoggedIn = loginVerify(event);

  const sql =
    "SELECT * \n" +
    "FROM photo_albums \n" +
    "WHERE photo_albums.album_private!= 1\n" +
    (albumPath ? "AND photo_albums.album_path = ?" : "") +
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
    dbResults = albumPasswordFilter(dbResults, isLoggedIn);
    total = dbResults.data.length;
    return setJson(
      { data: { list: dbResults.data, total: total } },
      dbResults,
    ) as ApiAlbumModelType["result"];
  } else {
    return dbResults;
  }
});
