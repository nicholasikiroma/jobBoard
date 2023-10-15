import express from "express";
import jwtRequired from "../middlewares/verifyJWT.js";
import { jobPostingController } from "../controllers/jobPostings.controller.js";
import { validator } from "../validators/jobPosting.validator.js";
import validate from "../middlewares/validate.js";
import { validator as reviewValidator } from "../validators/reviews.validator.js";

const jobRouter = express.Router();

jobRouter.use(jwtRequired);

// fetch job by jobId
jobRouter.get(
  "/:jobId",
  validator.fetchById(),
  validate,
  jobPostingController.fetchOneJob
);

// fetch job associated wth user
jobRouter.get(
  "/users/:userId",
  validator.fetchByUser(),
  validate,
  jobPostingController.fetchUserJobs
);

// fetch all jobs
jobRouter.get("", jobPostingController.fetchAllJobs);

// create new job posting
jobRouter.post(
  "",
  validator.createJob(),
  validate,
  jobPostingController.createJob
);

// update job posting
jobRouter.put(
  "/:jobId/users/:userId",
  validator.fetchByIdAndUser(),
  validate,
  jobPostingController.updateJob
);

// delete job posting
jobRouter.delete(
  "/:jobId/users/:userId",
  validator.fetchByIdAndUser(),
  validate,
  jobPostingController.deleteJob
);

// create a review
jobRouter.post(
  "/:jobId/reviews",
  reviewValidator.createReview(),
  validate,
  jobPostingController
);

// update review
jobRouter.post(
  "/:jobId/reviews/:reviewId",
  reviewValidator.updateReview(),
  validate,
  jobPostingController
);

export default jobRouter;
