import mysql from "mysql2";
import { config } from "~~/server/config";

export const getDB = () => {
  return mysql.createPool(config.db);
};
export const getDBQuery = (sql: string, values: any) => {
  return new Promise((resolve, reject) => {
    const pool = getDB();
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        pool.query(sql, values, (err, results) => {
          connection.release(); // 释放连接回连接池
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};
export const getHandledQuery = async (sql: string, values: any) => {
  try {
    const rows = (await getDBQuery(sql, values)) as any[];
    if (rows) {
      return { code: 0, message: "查询成功", data: rows };
    } else {
      return { code: 500, message: "预期的结果不存在", data: null };
    }
  } catch (e) {
    return { code: 500, message: "数据库连接失败", data: null };
  }
};
