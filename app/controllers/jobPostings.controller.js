import asyncHandler from "express-async-handler";
import httpStatus from "http-status";
import { APIError } from "../config/error.js";
import {
  getJobById,
  updateOneJob,
  destroyJob,
  getAllJobs,
  newJob,
  getUserJobs,
} from "../services/jobPosting.service.js";

// fetch one job posting
export const fetchOneJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const job = await getJobById(jobId);
  res.status(httpStatus.OK).send(job);
});

// fetch jobs created by user
export const fetchUserJobs = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const id = req.userId;
  if (!id === userId) {
    throw new APIError(
      "UNAUTHORIZED",
      httpStatus.UNAUTHORIZED,
      true,
      "You do not have permissions to access this resource"
    );
  }
  const userJobs = await getUserJobs(userId);
  res.status(httpStatus.OK).send(userJobs);
});

// fetch all jobs
export const fetchAllJobs = asyncHandler(async (req, res) => {
  const allJobs = await getAllJobs();
  res.status(httpStatus.OK).send(allJobs);
});

// create job
export const createJob = asyncHandler(async (req, res) => {
  const data = req.body;
  const role = req.role;

  if (role === "employer" || role === "admin") {
    const job = await newJob(data);
    return res.status(httpStatus.CREATED).send(job);
  } else {
    throw new APIError(
      "UNAUTHORIZED",
      httpStatus.UNAUTHORIZED,
      true,
      "You do not have permissions to access this resource"
    );
  }
});

// update job
export const updateJob = asyncHandler(async (req, res) => {
  const data = req.body;
  const { jobId } = req.params;
  const { userId } = req.params;
  const id = req.userId;
  const role = req.role;

  if (!id === userId) {
    throw new APIError(
      "UNAUTHORIZED",
      httpStatus.UNAUTHORIZED,
      true,
      "You do not have permissions to access this resource"
    );
  }

  const job = await getJobById(jobId);

  if (role === "admin" || job.employer_id === userId) {
    await updateOneJob(jobId, data);
  } else {
    throw new APIError(
      "Unauthrozied",
      httpStatus.UNAUTHORIZED,
      true,
      "You don't have the right permissions to operate on this resource"
    );
  }

  res.status(httpStatus.OK).send({ message: "Job updated" });
});

// delete job
export const deleteJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const { userId } = req.params;
  const id = req.userId;
  const role = req.role;

  if (!id === userId) {
    throw new APIError(
      "UNAUTHORIZED",
      httpStatus.UNAUTHORIZED,
      true,
      "You do not have permissions to access this resource"
    );
  }

  const job = await getJobById(jobId);

  if (role === "admin" || job.employer_id === userId) {
    await destroyJob(jobId);
  } else {
    throw new APIError(
      "Unauthrozied",
      httpStatus.UNAUTHORIZED,
      true,
      "You don't have the right permissions to operate on this resource"
    );
  }

  res.status(httpStatus.OK).send({ message: "Job deleted" });
});
