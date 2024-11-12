/**
 * 文章密码验证
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const articleId = body.id || null;
  const password = body.password || null;

  if (!articleId || !password) {
    return { code: 400, message: "参数错误", data: null };
  }

  const sql = "SELECT * from articles where article_id=?";
  const dbResults = await getHandledQuery(sql, [articleId]);

  if (!dbResults.data || dbResults.data.length === 0) {
    return { code: 404, message: "文章不存在", data: null };
  }

  const article = dbResults.data[0];

  if (password === article.article_password) {
    return { code: 0, message: "密码正确", data: null };
  } else {
    return { code: 401, message: "密码错误", data: null };
  }
});
