import express from "express";
import jwtRequired from "../middlewares/verifyJWT.js";
import jobPostingController from "../controllers/jobPostings.controller.js";

const jobRouter = express.Router();

jobRouter.use(jwtRequired);

// fetch job by jobId
jobRouter.get("/:jobId", jobPostingController.fetchOneJob);

// fetch job associated wth user
jobRouter.get("/users/:userId", jobPostingController.fetchUserJobs);

// fetch all jobs
jobRouter.get("", jobPostingController.fetchAllJobs);

// create new job posting
jobRouter.post("", jobPostingController.createJob);

// update job posting
jobRouter.put("/:jobId/users/:userId", jobPostingController.updateJob);

// delete job posting
jobRouter.delete("/:jobId/users/:userId", jobPostingController.deleteJob);

export default jobRouter;
