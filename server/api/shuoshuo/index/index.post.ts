/**
 * 查询说说列表
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pageNumer = Number(body.page_numer || -1);
  const pageSize = Number(body.page_size || -1);
  const collectionPath = body.coll_path || null;

  const sql =
    "SELECT * \n" +
    "FROM shuoshuos \n" +
    "JOIN shuoshuo_collections ON shuoshuos.shuoshuo_coll_id = shuoshuo_collections.sh_coll_id \n" +
    (collectionPath ? "WHERE shuoshuo_collections.sh_coll_path = ?" : "") +
    "ORDER BY shuoshuos.shuoshuo_date DESC\n" +
    (pageNumer !== -1 && pageSize !== -1 ? "LIMIT?,?;" : ";");

  let values = [];
  if (collectionPath) {
    values.push(collectionPath);
  }
  if (pageNumer !== -1 && pageSize !== -1) {
    const pageLimit = pageNumer == 1 ? 0 : (pageNumer - 1) * pageSize;
    values.push(pageLimit, pageSize);
  }

  const dbResults = await getHandledQuery(sql, values);

  dbResults.data?.forEach((item: any) => {
    if (item.shuoshuo_text.length > 60) {
      item.shuoshuo_text = item.shuoshuo_text.substring(0, 60) + "...";
    }
  });

  return dbResults;
});
