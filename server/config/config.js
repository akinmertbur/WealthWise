import dotenv from "dotenv";

dotenv.config();

const environments = {
  development: {
    //databaseURL: process.env.DATABASE_URL,
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  test: {
    //databaseURL: process.env.DATABASE_URL_TEST,
    url: process.env.DATABASE_URL_TEST,
    dialect: "postgres",
  },
  production: {
    //databaseURL: process.env.DATABASE_URL,
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
};

const currentEnvironment = process.env.NODE_ENV || "development";

export const config = {
  ...environments[currentEnvironment],
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET,
};

export default config;
