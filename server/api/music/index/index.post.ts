import { music } from '@@/models';
type ApiIndexModelType = music.ApiIndex;

/**
 * 查询音乐列表
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiIndexModelType['params'];
  const pageNumer = Number(body.page_numer || -1);
  const pageSize = Number(body.page_size || -1);
  const sheetPath = body.sheet_pash || null;

  const sql =
    'SELECT * \n' +
    'FROM songs \n' +
    'JOIN song_sheets ON songs.song_sheet_id = song_sheets.sheet_id \n' +
    (sheetPath ? 'WHERE song_sheets.sheet_pash = ?' : '') +
    'ORDER BY songs.song_id DESC\n' +
    (pageNumer !== -1 && pageSize !== -1 ? 'LIMIT ?,?;' : ';');

  let values = [];
  if (sheetPath) {
    values.push(sheetPath);
  }
  if (pageNumer !== -1 && pageSize !== -1) {
    const pageLimit = pageNumer == 1 ? 0 : (pageNumer - 1) * pageSize;
    values.push(pageLimit, pageSize);
  }

  const dbResults = await getHandledQuery(sql, values);
  let total = 0;

  if (dbResults.code === 0 && dbResults.data && dbResults.data.length > 0) {
    total = dbResults.data.length;
    return setJson(
      { data: { list: dbResults.data, total: total } },
      dbResults,
    ) as ApiIndexModelType['result'];
  } else {
    return dbResults;
  }
});
