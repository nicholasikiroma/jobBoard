import httpStatus from "http-status";
import { APIError } from "../config/error.js";
import dB from "../models/index.js";
import { Op } from "sequelize";

export async function getJobById(jobId) {
  const job = await dB.jobPostings.findByPk(jobId);
  if (!job) {
    throw new APIError(
      "NOT FOUND",
      httpStatus.NOT_FOUND,
      true,
      "Job posting not found"
    );
  }
  return job;
}

export async function getUserJobs(userId) {
  const userJobs = await dB.jobPostings.findAll({
    where: {
      [Op.or]: [{ employer_id: userId }, { freelancer_id: userId }],
    },
  });
  if (!userJobs) {
    throw new APIError(
      "NOT FOUND",
      httpStatus.NOT_FOUND,
      true,
      "No jobs found for user"
    );
  }
  return userJobs;
}

export async function getAllJobs() {
  const allJobs = await dB.jobPostings.findAll();
  if (!allJobs) {
    throw new APIError(
      "NOT FOUND",
      httpStatus.NOT_FOUND,
      true,
      "No jobs found"
    );
  }
  return allJobs;
}

export async function newJob(data) {
  const job = await dB.jobPostings.create({ ...data });
  if (!job) {
    throw new APIError(
      "Internal Server Error",
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
      "Failed to create new job posting"
    );
  }
  return job;
}

export async function updateOneJob(jobId, data) {
  const jobUpdate = await dB.jobPostings.update(
    { ...data },
    {
      where: {
        id: jobId,
      },
    }
  );
  if (!jobUpdate) {
    throw new APIError(
      "Internal Server Error",
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
      "Failed to update job posting"
    );
  }
  return jobUpdate;
}

export async function destroyJob(jobId) {
  const job = await dB.jobPostings.destroy({
    where: {
      id: jobId,
    },
  });
  if (!job) {
    throw new APIError(
      "Internal Server Error",
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
      "Failed to delete job posting"
    );
  }
  return job;
}
