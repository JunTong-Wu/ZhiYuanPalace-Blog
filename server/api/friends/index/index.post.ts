/**
 * 查询所有朋友
 */
export default defineEventHandler(async (event) => {
  let sql =
    "select * from friends, friend_collections where friends.friend_coll_id = friend_collections.frd_coll_id ";
  return await getHandledQuery(sql, null);
});
