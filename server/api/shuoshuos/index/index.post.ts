import { shuoshuo } from '@@/models';
type ApiIndexModelType = shuoshuo.ApiIndex;

/**
 * 查询说说列表
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ApiIndexModelType['params'];
  const pageNumer = Number(body.page_numer || -1);
  const pageSize = Number(body.page_size || -1);
  const collectionPath = body.coll_path || null;

  const sql =
    'SELECT * \n' +
    'FROM shuoshuos \n' +
    'JOIN shuoshuo_collections ON shuoshuos.shuoshuo_coll_id = shuoshuo_collections.sh_coll_id \n' +
    (collectionPath ? 'WHERE shuoshuo_collections.sh_coll_path = ?' : '') +
    'ORDER BY shuoshuos.shuoshuo_date DESC\n' +
    (pageNumer !== -1 && pageSize !== -1 ? 'LIMIT ?,?;' : ';');

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
      if (item.shuoshuo_text.length > 60) {
        item.shuoshuo_text = item.shuoshuo_text.substring(0, 60) + '...';
      }
    });
    total = dbResults.data.length;
  }

  return setJson(
    { data: { list: dbResults.data, total: total } },
    dbResults,
  ) as ApiIndexModelType['result'];
});
