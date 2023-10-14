import { Router } from "express";
import pkg from "../config/baseConfigs.cjs";
const { env: NODE_ENV } = pkg;
import userRouter from "./user.route.js";
import authRouter from "./auth.routes.js";
import jobRouter from "./jobPosting.route.js";
import applicationRouter from "./application.route.js";
import walletRouter from "./wallets.route.js";

const router = Router();

const defaultRoutes = [
  {
    path: "/wallets",
    route: walletRouter,
  },
  {
    path: "/applications",
    route: applicationRouter,
  },
  {
    path: "/job-postings",
    route: jobRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },

  {
    path: "/auth",
    route: authRouter,
  },
];

const devRoutes = [
  {
    path: "/dev/applications",
    route: applicationRouter,
  },
  {
    path: "/dev/job-postings",
    route: jobRouter,
  },
  {
    path: "/dev/users",
    route: userRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (NODE_ENV == "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
