/**
 * 查询单篇文章
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const params = getRouterParams(event);
  const id = params.id;
  const password = body.password || null;
  let sql = "SELECT * from articles where article_id= ?";
  let values = [];
  if (id) {
    values.push(id);
  }
  if (password) {
    values.push(password);
  }
  const dbResults = await getHandledQuery(sql, values);

  if (!password) {
    const passwordFilter = articlePasswordFilter(dbResults);
    return passwordFilter;
  } else if (
    dbResults.data &&
    password === dbResults.data[0].article_password
  ) {
    const results = dbResults;
    delete results.data[0].article_password;
    return results;
  } else {
    return { code: 401, message: "密码错误", data: null };
  }
});
