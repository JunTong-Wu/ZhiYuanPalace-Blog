/**
 * 仪表盘——Post汇总信息
 */
export default defineEventHandler(async (event) => {
  const sql = [
    `SELECT COUNT(*) AS count FROM articles`,
    `SELECT COUNT(*) AS count FROM shuoshuos`,
    `SELECT COUNT(*) AS count FROM videos`,
    `SELECT COUNT(*) AS count FROM photos`,
  ].join(";");
  let dbResults = await getHandledQuery(sql, null);
  console.log(dbResults);
  return dbResults;
});
