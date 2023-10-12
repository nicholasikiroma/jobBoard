import express from "express";
import applicationController from "../controllers/applications.controller.js";
import jwtRequired from "../middlewares/verifyJWT.js";

const applicationRouter = express.Router();

applicationRouter.use(jwtRequired);

// fetch an application
applicationRouter.get(
  "/:applicationId",
  applicationController.fetchApplicationByID
);

// create an application
applicationRouter.post("/", applicationController.createApplication);

// update an appplication
applicationRouter.put(
  "/:applicationId/users/:userId",
  applicationController.updateUserApplication
);

// accept an application
applicationRouter.put(
  "/:applicationId/users/:userId/accept",
  applicationController.acceptApplication
);
// delete an application
applicationRouter.delete(
  "/:applicationId/users/:userId",
  applicationController.withdrawUserApplication
);

export default applicationRouter;
