import { body, param } from "express-validator";

const createJob = () => {
  return [
    body("title").notEmpty().isString().trim(),
    body("description").notEmpty().isString().trim(),
    body("budget").notEmpty().isNumeric(),
    body("employer_id").notEmpty().isUUID("4"),
    body("freelancer_id").optional().isUUID("4"),
    body("skillLeve").notEmpty().isIn(["beginner", "intermediate", "expert"]),
  ];
};

const updateJob = () => {
  return [
    body("title").optional().isString().trim(),
    body("description").optional().isString().trim(),
    body("budget").optional().isNumeric(),
    body("skillLeve").notEmpty().isIn(["beginner", "intermediate", "expert"]),
  ];
};

const fetchById = () => {
  return [param("jobId").notEmpty().isUUID("4")];
};

const fetchByUser = () => {
  return [param("userId").notEmpty().isUUID("4")];
};

const fetchByIdAndUser = () => {
  return [
    param("jobId").notEmpty().isUUID("4"),
    param("userId").notEmpty().isUUID("4"),
  ];
};

export const validator = {
  fetchById,
  fetchByIdAndUser,
  fetchByUser,
  createJob,
  updateJob,
};
