// server/utils/logger.js
const log = (message) => {
  console.log(`[LOG]: ${message}`);
};

const error = (message) => {
  console.error(`[ERROR]: ${message}`);
};

export { log, error };
