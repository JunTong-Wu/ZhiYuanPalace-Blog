export const getConfig = () => {
  return {
    db: {
      host: "localhost",
      user: "root",
      password: "123456",
      database: "zhiyuanpalace",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    },
  };
};

export const config = getConfig();
