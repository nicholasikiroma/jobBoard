import express from "express";
import { applicationController } from "../controllers/applications.controller.js";
import jwtRequired from "../middlewares/verifyJWT.js";
import validate from "../middlewares/validate.js";
import { validator } from "../validators/application.validator.js";

const applicationRouter = express.Router();

applicationRouter.use(jwtRequired);

// fetch an application
applicationRouter.get(
  "/:applicationId",
  validator.fetchById(),
  validate,
  applicationController.fetchApplicationByID
);

// create an application
applicationRouter.post(
  "/",
  validator.createApplication(),
  validate,
  applicationController.createApplication
);

// update an appplication
applicationRouter.put(
  "/:applicationId/users/:userId",
  validator.fetchByIdAndUser(),
  validate,
  applicationController.updateUserApplication
);

// accept an application
applicationRouter.put(
  "/:applicationId/users/:userId/accept",
  validator.fetchByIdAndUser(),
  validate,
  applicationController.acceptApplication
);
// delete an application
applicationRouter.delete(
  "/:applicationId/users/:userId",
  validator.fetchByIdAndUser(),
  validate,
  applicationController.withdrawUserApplication
);

export default applicationRouter;
