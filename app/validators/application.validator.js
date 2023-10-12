import { body, param } from "express-validator";

const createApplication = () => {
  return [
    body("job_posting_id").notEmpty().isUUID("4"),
    body("freelancer_id").notEmpty().isUUID("4"),
    body("employer_id").notEmpty().isUUID("4"),
    body("pitch").notEmpty().isString().trim(),
    body("status").optional().isIn(["pending", "accepted", "declined"]),
  ];
};

const fetchById = () => {
  return [param("applicationId").notEmpty().isUUID("4")];
};

const fetchByIdAndUser = () => {
  return [
    param("applicationId").notEmpty().isUUID("4"),
    param("userId").notEmpty().isUUID("4"),
  ];
};

const updateApplication = () => {
  return [
    body("pitch").optional().isString().trim(),
    body("status").optional().isIn(["pending", "accepted", "declined"]),
  ];
};

export const validator = {
  fetchById,
  fetchByIdAndUser,
  updateApplication,
  createApplication,
};
