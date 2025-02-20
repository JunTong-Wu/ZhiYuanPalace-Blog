import * as CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { config } from '~~/server/config';

/**
 * 登录
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const username = body.username || null;
  const password = body.password || null;

  if (!username || !password) {
    return setJson({ code: 400, message: '用户名或密码不能为空' });
  }

  const sql = 'SELECT * FROM users WHERE username =?;';

  const dbResults = await getHandledQuery(sql, [username]);

  if (dbResults.data && dbResults.data.length > 0) {
    const hashPasswordDB = dbResults.data[0].password;
    if (encryptData(password) === hashPasswordDB) {
      // 用户认证成功，生成 Token
      const token = jwt.sign(
        {
          data: {
            id: dbResults.data[0].id,
            username: dbResults.data[0].username,
            password: password,
          },
        },
        config.jwt.secret, // 生成 token 的密钥，需要保密
        { expiresIn: config.jwt.expiresIn }, // token 过期时间
      );
      return setJson({
        message: '登录成功',
        data: Object.assign(dbResults.data[0], { token: token }),
      });
    } else {
      return setJson({
        code: 401,
        message: '密码错误',
      });
    }
  } else {
    return setJson({ code: 400, message: '用户不存在' });
  }
});
