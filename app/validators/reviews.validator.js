import { body, param } from "express-validator";

const createReview = () => {
  return [
    body("employer_review").notEmpty().isString(),
    body("freelancer_review").notEmpty().isString(),
    param("jobId").notEmpty().isUUID("4"),
  ];
};

const updateReview = () => {
  return [
    body("employer_review").optional().isString(),
    body("freelancer_review").optional().isString(),
    param("jobId").notEmpty().isUUID("4"),
  ];
};

export const validator = {
  createReview,
  updateReview,
};
