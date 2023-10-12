import express from "express";
import {
  acceptApplication,
  createApplication,
  fetchApplicationByID,
  updateUserApplication,
  withdrawUserApplication,
} from "../controllers/applications.controller.js";
import jwtRequired from "../middlewares/verifyJWT.js";

const applicationRouter = express.Router();

applicationRouter.use(jwtRequired);

// fetch an application
applicationRouter.get("/:applicationId", fetchApplicationByID);

// create an application
applicationRouter.post("/", createApplication);

// update an appplication
applicationRouter.put("/:applicationId/users/:userId", updateUserApplication);

// accept an application
applicationRouter.put(
  "/:applicationId/users/:userId/accept",
  acceptApplication
);
// delete an application
applicationRouter.delete(
  "/:applicationId/users/:userId",
  withdrawUserApplication
);

export default applicationRouter;
