import { BaseError } from "../config/error.js";
import logger from "../config/logger.js";
import pkg from "../config/baseConfigs.cjs";
import httpStatus from "http-status";
const { env } = pkg;

class ErrorHandler {
  async handleError(err, res) {
    const { name, httpCode, message, isOperational } = err;

    // Log the error to the console in development mode
    if (env === "development") {
      logger.error(err.stack);
    }
    const statusCode = httpCode ? httpCode : httpStatus.INTERNAL_SERVER_ERROR;
    return res.status(statusCode).send({
      error: name,
      statusCode: statusCode,
      message,
      isOperational: isOperational ? isOperational : false,
    });
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export const errorHandler = new ErrorHandler();
