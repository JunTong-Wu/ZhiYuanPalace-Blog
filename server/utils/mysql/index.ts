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
