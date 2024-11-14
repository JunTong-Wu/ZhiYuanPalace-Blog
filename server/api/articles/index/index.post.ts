/**
 * 查询文章列表
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pageNumer = Number(body.page_numer || -1);
  const pageSize = Number(body.page_size || -1);
  const classifyPath = body.classify_path || null;

  const sql =
    "SELECT * \n" +
    "FROM articles \n" +
    "JOIN article_classifys ON articles.article_classify_id = article_classifys.classify_id \n" +
    "WHERE articles.article_private!= 1\n" +
    (classifyPath ? "AND article_classifys.classify_path = ?" : "") +
    "ORDER BY articles.article_date DESC\n" +
    (pageNumer !== -1 && pageSize !== -1 ? "LIMIT?,?;" : ";");

  let values = [];
  if (classifyPath) {
    values.push(classifyPath);
  }
  if (pageNumer !== -1 && pageSize !== -1) {
    const pageLimit = pageNumer == 1 ? 0 : (pageNumer - 1) * pageSize;
    values.push(pageLimit, pageSize);
  }

  let dbResults = await getHandledQuery(sql, values);

  if (dbResults.code === 0 && dbResults.data && dbResults.data.length > 0) {
    dbResults = articlePasswordFilter(dbResults);
    dbResults.data.forEach((item) => {
      if (item.article_text.length > 60) {
        item.article_text = item.article_text.substring(0, 60) + "...";
      }
    });
  }

  return dbResults;
});
