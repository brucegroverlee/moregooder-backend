import * as dotenv from "dotenv";
if (!process?.env?.NODE_ENV) {
  dotenv.config();
}

const dev = "development";

export default {
  env: process.env.APP_ENV || dev,
  server: {
    root: process.env.SERVER_ROOT || "/api",
    port: process.env.PORT || 3003,
    origins:
      process.env.ORIGINS || "http://localhost:3000,http://localhost:3001,http://localhost:3002",
  },
  params: {
    envs: {
      dev,
      pdn: "production",
      test: "testing",
    },
    defaultError: {
      code: 500,
      message: "SOMETHING_WENT_WRONG",
    },
    defaultLang: "en",
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  },
  mysql: {
    HOST: process.env.MYSQL_HOST,
    PORT: process.env.MYSQL_PORT,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DATABASE: process.env.MYSQL_DATABASE,
    DB_SOCKET_PATH: process.env.DB_SOCKET_PATH || '',
    CLOUD_SQL_CONNECTION_NAME: process.env.CLOUD_SQL_CONNECTION_NAME || '',
  },
  intercom: {
    ACCESS_TOKEN: process.env.INTERCOM_ACCESS_TOKEN,
  },
  swagger: {
    TITLE: process.env.SWAGGER_TITLE,
    DESCRIPTION: process.env.SWAGGER_DESCRIPTION,
    CONTACT_NAME: process.env.SWAGGER_CONTACT_NAME,
    CONTACT_URL: process.env.SWAGGER_CONTACT_URL,
    CONTACT_EMAIL: process.env.SWAGGER_CONTACT_EMAIL,
    SERVER: process.env.SWAGGER_SERVER,
  },
};
