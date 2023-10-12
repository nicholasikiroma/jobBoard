import { body } from "express-validator";

const login = () => {
  return [
    body("email").notEmpty().isEmail().trim(),
    body("hashed_password").notEmpty().trim(),
  ];
};

export const validator = {
  login,
};
