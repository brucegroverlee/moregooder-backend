import config from "../config";
import pkg from "../../../package.json";

export const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: config.swagger.TITLE,
      version: pkg.version,
      description: config.swagger.DESCRIPTION,
    },
    servers: [
      {
        url: config.swagger.SERVER,
      },
    ],
  },
  apis: [
    // "./src/**/*.ts",
    "./src/**/*.yml",
  ],
};