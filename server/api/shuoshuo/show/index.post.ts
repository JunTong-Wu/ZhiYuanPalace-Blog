/**
 * 展示单篇说说
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.shuoshuo_id || null;
  let sql = "SELECT * FROM shuoshuos WHERE shuoshuo_id= ?";
  let values = [];
  if (id) {
    values.push(id);
  }
  const dbResults = await getHandledQuery(sql, values);
  if (dbResults.data) {
    return setJson({ data: dbResults.data[0] }, dbResults);
  }
});
