import app from "./app/index.js";
import logger from "./app/utils/logger.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server running on ${port}`);
});
