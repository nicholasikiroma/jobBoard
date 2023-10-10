import express from "express";
import jwtRequired from "../middlewares/verifyJWT.js";
import {
  createJob,
  deleteJob,
  fetchAllJobs,
  fetchOneJob,
  fetchUserJobs,
  updateJob,
} from "../controllers/jobPostings.controller.js";

const jobRouter = express.Router();

jobRouter.use(jwtRequired);

jobRouter.get("/:id", fetchOneJob);
jobRouter.get("/users/:userId", fetchUserJobs);
jobRouter.get("", fetchAllJobs);
jobRouter.post("", createJob);
jobRouter.put("/:jobId/users/:userId", updateJob);
jobRouter.delete("/:jobId/users/:userId", deleteJob);

export default jobRouter;
