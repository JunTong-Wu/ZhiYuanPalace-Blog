/**
 * 相册密码验证
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const albumId = body.id || null;
  const password = body.password || null;

  if (!albumId || !password) {
    return { code: 400, message: '参数错误', data: null };
  }

  const sql = 'SELECT * from photo_albums where album_id=?';
  const dbResults = await getHandledQuery(sql, [albumId]);

  if (!dbResults.data || dbResults.data.length === 0) {
    return { code: 404, message: '相册不存在', data: null };
  }

  const album = dbResults.data[0];

  if (password === album.album_password) {
    return { code: 0, message: '密码正确', data: null };
  } else {
    return { code: 401, message: '密码错误', data: null };
  }
});
