import app from "./app/index.js";
import logger from "./app/config/logger.js";
import pkg from "./app/config/baseConfigs.cjs";
import { errorHandler } from "./app/middlewares/errorHandler.js";
const { port } = pkg;

process.on("uncaughtException", (error) => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});

app.listen(port, () => {
  logger.info(`Server running on ${port}`);
});
