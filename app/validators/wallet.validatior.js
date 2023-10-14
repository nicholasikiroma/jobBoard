import { body, param } from "express-validator";

const fundWallet = () => {
  return [body("amount").notEmpty().isNumeric()];
};

const transfer = () => {
  return [
    body("to").notEmpty().isUUID("4"),
    body("from").notEmpty().isUUID("4"),
    body("narration").notEmpty().isString(),
    body("amount").notEmpty().isNumeric(),
    param("userId").notEmpty().isUUID("4"),
  ];
};

export const validator = {
  transfer,
  fundWallet,
};
