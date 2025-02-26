import { article, video } from "@@/models";
import {
  articlePasswordFilter,
  videoPasswordFilter,
} from "~~/server/utils/helper";
type ApiShowModelType = article.ApiShow;
type Article = article.Article;

/**
 * 展示单篇文章
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiShowModelType["params"];
  const id = body.article_id || null;
  const password = body.article_password || null;
  let sql = "SELECT * FROM articles WHERE article_id= ?";
  let values = [];
  if (id) {
    values.push(id);
  }
  let dbResults = await getHandledQuery(sql, values);

  if (dbResults.code === 0 && dbResults.data && dbResults.data.length > 0) {
    dbResults = articlePasswordFilter(dbResults, password);
    return setJson(
      { data: dbResults.data[0] },
      dbResults,
    ) as ApiShowModelType["result"];
  } else {
    return dbResults;
  }
});
