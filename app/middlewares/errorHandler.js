import { BaseError } from "../config/error.js";
import logger from "../config/logger.js";
import pkg from "../config/baseConfigs.cjs";
const { env } = pkg;

class ErrorHandler {
  async handleError(err, res) {
    const { name, httpCode, message, isOperational } = err;

    // Log the error to the console in development mode
    if (env === "development") {
      logger.error(err.stack);
    }
    return res
      .status(httpCode)
      .send({ error: name, statusCode: httpCode, message, isOperational });
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export const errorHandler = new ErrorHandler();
