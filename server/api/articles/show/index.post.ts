import { article } from "@@/models";
import { articlePasswordFilter } from "~~/server/utils/helper";
import { loginVerify } from "~~/server/utils/helper/loginVerify";
type ApiShowModelType = article.ApiShow;

/**
 * 展示单篇文章
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiShowModelType["params"];
  const id = body.article_id || null;
  const password = body.article_password || null;

  // 验证 JWT 令牌
  const isLoggedIn = loginVerify(event);

  let sql = "SELECT * FROM articles WHERE article_id= ?";
  let values = [];
  if (id) {
    values.push(id);
  }
  let dbResults = await getHandledQuery(sql, values);

  if (dbResults.code === 0 && dbResults.data && dbResults.data.length > 0) {
    dbResults = articlePasswordFilter(dbResults, password, isLoggedIn);
    return setJson(
      { data: dbResults.data[0] },
      dbResults,
    ) as ApiShowModelType["result"];
  } else {
    return dbResults;
  }
});
