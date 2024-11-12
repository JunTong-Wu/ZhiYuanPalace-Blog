export const getConfig = () => {
  // 读取环境变量
  // @ts-ignore
  const host = import.meta.env.NITRO_SERVER_DB_HOST;
  // @ts-ignore
  const port = import.meta.env.NITRO_SERVER_DB_PORT;
  // @ts-ignore
  const user = import.meta.env.NITRO_SERVER_DB_USER;
  // @ts-ignore
  const password = import.meta.env.NITRO_SERVER_DB_PASSWORD;
  // @ts-ignore
  const database = import.meta.env.NITRO_SERVER_DB_DATABASE;
  // @ts-ignore
  const expiresIn = import.meta.env.NITRO_SERVER_JWT_EXPIRES_IN;
  // @ts-ignore
  const secret = import.meta.env.NITRO_SERVER_JWT_SECRET;

  return {
    db: {
      host: host,
      port: port,
      user: user,
      password: password,
      database: database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    },
    jwt: {
      expiresIn: expiresIn,
      secret: secret,
    },
  };
};

export const config = getConfig();
