/**
 * URL: /api/shuoshuos/show
 * 请求方式: POST
 * 请求参数:
 *  - shuoshuo_id: 说说ID
 * 返回参数:
 *  - code: 状态码
 *  - message: 消息
 *  - data: 数据
 */

import { shuoshuo } from "@@/models";
type ApiShowModelType = shuoshuo.ApiShow;
/**
 * 展示单篇说说
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiShowModelType["params"];
  const id = body.shuoshuo_id || null;
  let sql = "SELECT * FROM shuoshuos WHERE shuoshuo_id= ?";
  let values = [];
  if (id) {
    values.push(id);
  }
  const dbResults = await getHandledQuery(sql, values);
  if (dbResults.code === 0 && dbResults.data && dbResults.data.length > 0) {
    return setJson(
      { data: dbResults.data[0] },
      dbResults,
    ) as ApiShowModelType["result"];
  } else {
    return dbResults;
  }
});
