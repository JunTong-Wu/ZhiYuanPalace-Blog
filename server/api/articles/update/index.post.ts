/**
 * URL: /api/articles/update
 * 请求方式: POST
 * 请求参数:
 *  - article_classify_id: 文章分类ID
 *  - article_title: 文章标题
 *  - article_title_image: 文章标题图片
 *  - article_text: 文章内容
 *  - article_date: 文章日期
 *  - article_copyright: 文章版权
 *  - article_keywords: 文章关键词
 *  - article_private: 是否私有
 *  - article_password: 文章密码
 *  - article_id: 文章ID
 * 返回参数:
 *  - code: 状态码
 *  - message: 消息
 *  - data: 数据
 */

import { article } from "@@/models";
import { loginVerify } from "~~/server/utils/helper/loginVerify";
type ApiUpdateModelType = article.ApiUpdate;

/**
 * 编辑单篇文章
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiUpdateModelType["params"];
  const {
    article_classify_id,
    article_title,
    article_title_image,
    article_text,
    article_date,
    article_copyright,
    article_keywords,
    article_private,
    article_password,
    article_id,
  } = body;

  // 验证 JWT 令牌
  const isLoggedIn = loginVerify(event);

  if (isLoggedIn) {
    let sql = `
      UPDATE articles
      SET 
        article_classify_id = ?,
        article_title = ?,
        article_title_image = ?,
        article_text = ?,
        article_date = ?,
        article_copyright = ?,
        article_keywords = ?,
        article_private = ?,
        article_password = ?
      WHERE article_id = ?
    `;
    let values = [
      article_classify_id,
      article_title,
      article_title_image,
      article_text,
      article_date,
      article_copyright,
      article_keywords,
      article_private,
      article_password,
      article_id,
    ];

    let dbResults = await getHandledQuery(sql, values);

    if (dbResults.code === 0 && dbResults.data && dbResults.data.length > 0) {
      return setJson({
        message: "文章修改成功",
        data: null,
      }) as ApiUpdateModelType["result"];
    } else {
      return dbResults;
    }
  } else {
    return { code: 401, message: "登录状态无效", data: null };
  }
});
