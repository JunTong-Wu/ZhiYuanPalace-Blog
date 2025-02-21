import { video } from '@@/models';
import { videoPasswordFilter } from '~~/server/utils/helper';
type ApiIndexModelType = video.ApiIndex;
type Video = video.Video;

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
    'WHERE videos.video_private!= 1\n' +
    (collectionPath ? 'AND video_collections.vi_coll_path =?' : '') +
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

  let dbResults = await getHandledQuery(sql, values);
  let total = 0;

  if (dbResults.code === 0 && dbResults.data && dbResults.data.length > 0) {
    dbResults.data.forEach((item: Video) => {
      if (item.video_text.length > 60) {
        item.video_text = item.video_text.substring(0, 60) + '...';
      }
    });
    dbResults = videoPasswordFilter(dbResults);
    total = dbResults.data.length;
    return setJson(
      { data: { list: dbResults.data, total: total } },
      dbResults,
    ) as ApiIndexModelType['result'];
  } else {
    return dbResults;
  }
});
