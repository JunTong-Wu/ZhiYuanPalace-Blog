import { article } from '@@/models';
type ApiShowModelType = article.ApiShow;

/**
 * 展示单篇文章
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiShowModelType['params'];
  const id = body.article_id || null;
  const password = body.article_password || null;
  let sql = 'SELECT * FROM articles WHERE article_id= ?';
  let values = [];
  if (id) {
    values.push(id);
  }
  const dbResults = await getHandledQuery(sql, values);

  if (!password) {
    const passwordFilter = articlePasswordFilter(dbResults);
    return setJson({ data: passwordFilter.data[0] }, passwordFilter);
  } else if (
    dbResults.data &&
    password === dbResults.data[0].article_password
  ) {
    const results = dbResults;
    delete results.data[0].article_password;
    return setJson(
      { data: results.data[0] },
      results,
    ) as ApiShowModelType['result'];
  } else {
    return setJson({
      code: 401,
      message: '密码错误',
    });
  }
});
