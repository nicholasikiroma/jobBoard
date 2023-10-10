export class BaseError extends Error {
  constructor(name, httpCode, description, isOperational) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  constructor(
    name,
    httpCode = 500,
    isOperational = true,
    description = "Internal Server Error"
  ) {
    super(name, httpCode, description, isOperational);
  }
}
