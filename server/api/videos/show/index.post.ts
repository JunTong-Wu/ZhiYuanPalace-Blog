import { video } from "@@/models";
import { videoPasswordFilter } from "~~/server/utils/helper";
import { loginVerify } from "~~/server/utils/helper/loginVerify";
type ApiShowModelType = video.ApiShow;

/**
 * 展示单篇视频
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiShowModelType["params"];
  const id = body.video_id || null;
  const password = body.video_password || null;

  // 验证 JWT 令牌
  const isLoggedIn = loginVerify(event);

  let sql = "SELECT * FROM videos WHERE video_id=?";
  let values = [];
  if (id) {
    values.push(id);
  }
  let dbResults = await getHandledQuery(sql, values);

  if (dbResults.code === 0 && dbResults.data && dbResults.data.length > 0) {
    dbResults = videoPasswordFilter(dbResults, password, isLoggedIn);
    return setJson(
      { data: dbResults.data[0] },
      dbResults,
    ) as ApiShowModelType["result"];
  } else {
    return dbResults;
  }
});
