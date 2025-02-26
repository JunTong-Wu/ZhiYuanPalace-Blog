/**
 * 视频密码验证
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const videoId = body.id || null;
  const password = body.password || null;

  if (!videoId || !password) {
    return { code: 400, message: "参数错误", data: null };
  }

  const sql = "SELECT * from videos where video_id=?";
  const dbResults = await getHandledQuery(sql, [videoId]);

  if (!dbResults.data || dbResults.data.length === 0) {
    return { code: 404, message: "视频不存在", data: null };
  }

  const video = dbResults.data[0];

  if (password === video.video_password) {
    return { code: 0, message: "密码正确", data: null };
  } else {
    return { code: 401, message: "密码错误", data: null };
  }
});
