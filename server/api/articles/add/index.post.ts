import { article } from "@@/models";
import { loginVerify } from "~~/server/utils/helper/loginVerify";

type ApiAddModelType = article.ApiAdd;

/**
 * 添加单篇文章
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiAddModelType["params"];
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
  } = body;

  // 验证 JWT 令牌
  const isLoggedIn = loginVerify(event);

  if (isLoggedIn) {
    // 定义 INSERT 语句
    let sql = `
        INSERT INTO articles (
            article_classify_id,
            article_title,
            article_title_image,
            article_text,
            article_date,
            article_copyright,
            article_keywords,
            article_private,
            article_password
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // 准备插入的值
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
    ];

    // 执行数据库插入操作
    let dbResults = await getHandledQuery(sql, values);

    if (dbResults.code === 0) {
      return setJson({
        message: "文章添加成功",
        data: null,
      }) as ApiAddModelType["result"];
    } else {
      return dbResults; // 返回数据库操作的结果
    }
  } else {
    return { code: 401, message: "登录状态无效", data: null };
  }
});
