import { video } from '@@/models';
type ApiIndexModelType = video.ApiIndex;

/**
 * 查询视频列表
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiIndexModelType['params'];
  const pageNumer = Number(body.page_numer || -1);
  const pageSize = Number(body.page_size || -1);
  const collectionPath = body.vi_coll_path || null;

  const sql =
    'SELECT * \n' +
    'FROM videos \n' +
    'JOIN video_collections ON videos.video_coll_id = video_collections.vi_coll_id \n' +
    (collectionPath ? 'WHERE video_collections.vi_coll_path =?' : '') +
    'ORDER BY videos.video_date DESC\n' +
    (pageNumer !== -1 && pageSize !== -1 ? 'LIMIT?,?;' : ';');

  let values = [];
  if (collectionPath) {
    values.push(collectionPath);
  }
  if (pageNumer !== -1 && pageSize !== -1) {
    const pageLimit = pageNumer == 1 ? 0 : (pageNumer - 1) * pageSize;
    values.push(pageLimit, pageSize);
  }

  const dbResults = await getHandledQuery(sql, values);
  let total = 0;

  if (dbResults.code === 0 && dbResults.data && dbResults.data.length > 0) {
    dbResults.data.forEach((item: any) => {
      if (item.video_text.length > 60) {
        item.video_text = item.video_text.substring(0, 60) + '...';
      }
    });
    total = dbResults.data.length;
  }

  return setJson(
    { data: { list: dbResults.data, total: total } },
    dbResults,
  ) as ApiIndexModelType['result'];
});
