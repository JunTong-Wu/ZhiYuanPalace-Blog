export const getHandledQuery = async (sql: string, values?: any) => {
  try {
    const rows = (await getDBQuery(sql, values || null)) as any[];
    if (rows) {
      return { code: 0, message: "查询成功", data: rows };
    } else {
      return { code: 500, message: "预期的结果不存在", data: null };
    }
  } catch (err: any) {
    return {
      code: 500,
      message: "数据库查询错误",
      data: null,
      errorMessages: err,
    };
  }
};
export const setJson = (
  option?: { code?: number; message?: string; data?: any },
  originalResults?: { code: number; message: string; data: any },
) => {
  if (option?.data === null) {
    return {
      code: option?.code || originalResults?.code || 0,
      message: option?.message || originalResults?.message || "查询成功",
      data: null,
    };
  } else {
    return {
      code: option?.code || originalResults?.code || 0,
      message: option?.message || originalResults?.message || "查询成功",
      data: option?.data || originalResults?.data || null,
    };
  }
};
