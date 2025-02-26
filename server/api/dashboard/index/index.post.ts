import os from "os";

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
  if (dbResults.code === 0 && dbResults.data && dbResults.data.length > 0) {
    const results = dbResults.data;
    const postsNumber = {
      total:
        results[0][0].count +
        results[1][0].count +
        results[2][0].count +
        results[3][0].count,
      article: results[0][0].count,
      shuoshuo: results[1][0].count,
      video: results[2][0].count,
      photo: results[3][0].count,
    };
    dbResults.data = postsNumber;
  }
  const OSInfo = {
    sys_version: os.version(),
    sys_uptime: osUtils.sysUptime(),
    cpu_platform: osUtils.platform(),
    cpu_arch: os.arch(),
    cpu_count: osUtils.cpuCount(),
    cpu_model: os.cpus()[0].model,
    cpu_speed: os.cpus()[0].speed,
    cpu_use: await osUtils.cpuUsage(),
    cpu_free: await osUtils.cpuFree(),
    ram_totalmem: osUtils.totalmem(),
    ram_freemem: osUtils.freemem(),
  };

  return setJson(
    {
      data: {
        posts_number: dbResults.data,
        os_info: OSInfo,
      },
    },
    dbResults,
  );
});
