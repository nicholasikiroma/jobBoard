import express from "express";
import loginLimiter from "../middlewares/loginLimiter.js";
import { authController } from "../controllers/auth.controller.js";
import { validator } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.js";

const authRouter = express.Router();

authRouter.post(
  "",
  loginLimiter,
  validator.login(),
  validate,
  authController.login
);

authRouter.get("/refresh", authController.refresh);

authRouter.post("/logout", authController.logout);

export default authRouter;
