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
  firestore: {
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID ,
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    FIRESTORE_USERS_COLLECTION: process.env.FIRESTORE_USERS_COLLECTION,
    FIRESTORE_CONTACTS_COLLECTION: process.env.FIRESTORE_CONTACTS_COLLECTION,
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
