import { Router } from "express";
import pkg from "../config/baseConfigs.cjs";
const { env: NODE_ENV } = pkg;
import userRouter from "./user.route.js";
import authRouter from "./auth.routes.js";
import jobRouter from "./jobPosting.route.js";

const router = Router();

const defaultRoutes = [
  // {
  //   path: "/applications",
  //   route: applicationRoute,
  // },
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
  //{
  //  path: "/dev/applications",
  //  route: applicationRoute,
  //},
  //{
  //  path: "/dev/job-postings",
  //  route: jobsRoute,
  //},
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
