import { body, param } from "express-validator";

const signUp = () => {
  return [
    body("email").notEmpty().isEmail().trim(),
    body("hashed_password").notEmpty().trim(),
    body("skill").optional().trim(),
    body("first_name").notEmpty().trim(),
    body("last_name").notEmpty().trim(),
    body("role").notEmpty().isIn(["freelancer", "admin", "employer"]),
    body("company").optional(),
    body("profilePicture").optional(),
  ];
};

const updateUser = () => {
  return [
    param("userId").notEmpty().isUUID("4"),
    body("skill").optional().trim(),
    body("first_name").optional().trim(),
    body("last_name").optional().trim(),
    body("company").optional(),
    body("profilePicture").optional(),
  ];
};

const fetchById = () => {
  return [param("userId").notEmpty().isUUID("4")];
};

export const validator = {
  signUp,
  fetchById,
  updateUser,
};
