import { Router } from "express";
import pkg from "../config/baseConfigs.cjs";
const { env: NODE_ENV } = pkg;
//import { router as applicationRoute } from "./application.route.js";
//import { router as jobsRoute } from "./jobPosting.route.js";
import { router as userRoute } from "./user.route.js";

const router = Router();

const defaultRoutes = [
  // {
  //   path: "/applications",
  //   route: applicationRoute,
  // },
  // {
  //   path: "/job-postings",
  //   route: jobsRoute,
  // },
  {
    path: "/users",
    route: userRoute,
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
    route: userRoute,
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
