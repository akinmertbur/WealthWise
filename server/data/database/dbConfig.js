import { Sequelize } from "sequelize";
import { config } from "../../config/config.js";
import { readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*
const sequelize = new Sequelize(config.databaseURL, {
  dialect: config.dialect,
});
*/
// config.url corresponds to config.databaseURL.
const sequelize = new Sequelize(config.url, {
  dialect: config.dialect,
});

const modelsPath = join(__dirname, "../models");
const modelFiles = readdirSync(modelsPath).filter((file) =>
  file.endsWith(".js")
);

const importModels = async () => {
  for (const file of modelFiles) {
    const modelPath = pathToFileURL(join(modelsPath, file)).href;
    const model = await import(modelPath);
    sequelize[model.default.name] = model.default;
  }
};

const setupAssociations = async () => {
  await import(pathToFileURL(join(__dirname, "./associations.js")).href);
};

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await importModels(); // Import models before setting up associations
    await setupAssociations(); // Set up associations
    await sequelize.sync({ force: false });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export const db = {
  query: async (text, params) => {
    const result = await sequelize.query(text, {
      bind: params,
      type: sequelize.QueryTypes.SELECT,
    });
    return result;
  },
  insert: async (text, params) => {
    const result = await sequelize.query(text, {
      bind: params,
      type: sequelize.QueryTypes.INSERT,
    });
    return result;
  },
};

export default sequelize;
