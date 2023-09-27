import app from "./app/index.js";
import logger from "./app/config/logger.js";
import pkg from "./app/config/baseConfigs.cjs";
const { port } = pkg;

app.listen(port, () => {
  logger.info(`Server running on ${port}`);
});
