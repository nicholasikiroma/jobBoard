import { validationResult } from "express-validator";
import httpStatus from "http-status";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
  return res
    .status(httpStatus.UNPROCESSABLE_ENTITY)
    .send({ errors: extractedErrors });
};

export default validate;
