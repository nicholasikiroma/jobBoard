import express from "express";
import loginLimiter from "../middlewares/loginLimiter.js";
import { login, logout, refresh } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("", loginLimiter, login);

authRouter.get("/refresh", refresh);

authRouter.post("/logout", logout);

export default authRouter;
