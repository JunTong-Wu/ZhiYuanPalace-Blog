import { video } from '@@/models';
type ApiShowModelType = video.ApiShow;

/**
 * 展示单篇视频
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiShowModelType['params'];
  const id = body.video_id || null;
  let sql = 'SELECT * FROM videos WHERE video_id=?';
  let values = [];
  if (id) {
    values.push(id);
  }
  const dbResults = await getHandledQuery(sql, values);
  if (dbResults.data) {
    return setJson(
      { data: dbResults.data[0] },
      dbResults,
    ) as ApiShowModelType['result'];
  }
});
