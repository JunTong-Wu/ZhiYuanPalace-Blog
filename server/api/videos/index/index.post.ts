/**
 * URL: /api/videos/index
 * 请求方式: POST
 * 请求参数:
 *  - page_numer: 页码
 *  - page_size: 每页条数
 *  - vi_coll_path: 视频分类路径
 * 返回参数:
 *  - code: 状态码
 *  - message: 消息
 *  - data: 数据
 */

import { video } from "@@/models";
import { videoPasswordFilter } from "~~/server/utils/helper";
import { loginVerify } from "~~/server/utils/helper/loginVerify";
type ApiIndexModelType = video.ApiIndex;
type Video = video.Video;

/**
 * 查询视频列表
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiIndexModelType["params"];
  const pageNumer = Number(body.page_numer || -1);
  const pageSize = Number(body.page_size || -1);
  const collectionPath = body.vi_coll_path || null;

  // 验证 JWT 令牌
  const isLoggedIn = loginVerify(event);

  const sql =
    "SELECT * \n" +
    "FROM videos \n" +
    "JOIN video_collections ON videos.video_coll_id = video_collections.vi_coll_id \n" +
    "WHERE videos.video_private!= 1\n" +
    (collectionPath ? "AND video_collections.vi_coll_path =?" : "") +
    "ORDER BY videos.video_date DESC\n" +
    (pageNumer !== -1 && pageSize !== -1 ? "LIMIT?,?;" : ";");

  let values = [];
  if (collectionPath) {
    values.push(collectionPath);
  }
  if (pageNumer !== -1 && pageSize !== -1) {
    const pageLimit = pageNumer == 1 ? 0 : (pageNumer - 1) * pageSize;
    values.push(pageLimit, pageSize);
  }

  let dbResults = await getHandledQuery(sql, values);
  let total = 0;

  if (dbResults.code === 0 && dbResults.data && dbResults.data.length > 0) {
    dbResults.data.forEach((item: Video) => {
      if (item.video_text.length > 60) {
        item.video_text = item.video_text.substring(0, 60) + "...";
      }
    });
    dbResults = videoPasswordFilter(dbResults, null, isLoggedIn);
    total = dbResults.data.length;
    return setJson(
      { data: { list: dbResults.data, total: total } },
      dbResults,
    ) as ApiIndexModelType["result"];
  } else {
    return dbResults;
  }
});
