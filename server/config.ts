export const getConfig = () => {
  // 读取环境变量
  const config = useRuntimeConfig();
  const host = config.DB_HOST;
  const port = Number(config.DB_PORT);
  const user = config.DB_USER;
  const password = config.DB_PASSWORD;
  const database = config.DB_DATABASE;
  const expiresIn = config.JWT_EXPIRES_IN;
  const secret = config.JWT_SECRET;
  const key = config.AES_KEY;
  const iv = config.AES_IV;

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
      multipleStatements: true,
    },
    jwt: {
      expiresIn: expiresIn,
      secret: secret,
    },
    aes: {
      key: key,
      iv: iv,
    },
  };
};

export const config = getConfig();
