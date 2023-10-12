import express from "express";
import loginLimiter from "../middlewares/loginLimiter.js";
import authController from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("", loginLimiter, authController.login);

authRouter.get("/refresh", authController.refresh);

authRouter.post("/logout", authController.logout);

export default authRouter;
