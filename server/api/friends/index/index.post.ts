/**
 * URL: /api/friends/index
 * 请求方式: POST
 * 请求参数: 无
 * 返回参数:
 *  - code: 状态码
 *  - message: 消息
 *  - data: 数据
 */

/**
 * 查询所有朋友
 */
export default defineEventHandler(async (event) => {
  let sql =
    "select * from friends, friend_collections where friends.friend_coll_id = friend_collections.frd_coll_id ";
  return await getHandledQuery(sql, null);
});
