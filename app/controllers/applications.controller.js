import asyncHandler from "express-async-handler";
import {
  applicationExists,
  destroyApplication,
  getApplicationByID,
  newApplication,
  updateApplication,
} from "../services/applications.service.js";
import httpStatus from "http-status";
import { APIError } from "../config/error.js";
import logger from "../config/logger.js";

export const fetchApplicationByID = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;
  const application = await getApplicationByID(applicationId);
  res.status(httpStatus.OK).send(application);
});

export const createApplication = asyncHandler(async (req, res) => {
  const data = req.body;
  const role = req.role;

  if (role === "employer") {
    throw new APIError(
      "Unauthorized",
      httpStatus.UNAUTHORIZED,
      true,
      "Employers are not allowed to create applications"
    );
  }
  const exists = await applicationExists(
    data.job_posting_id,
    data.freelancer_id
  );

  if (exists) {
    throw new APIError(
      "Not Acceptable",
      httpStatus.NOT_ACCEPTABLE,
      true,
      "Already applied to this job"
    );
  }

  const application = await newApplication(data);
  res.status(httpStatus.CREATED).send(application);
});

export const updateUserApplication = asyncHandler(async (req, res) => {
  const data = req.body;
  const { applicationId, userId } = req.params;
  const id = req.user;

  if (userId !== id) {
    throw new APIError(
      "Unauthorized",
      httpStatus.UNAUTHORIZED,
      true,
      "You are not permitted to operate on this resource"
    );
  }
  const application = await getApplicationByID(applicationId);
  if (application.freelancer_id === userId || role === "admin") {
    await destroyApplication(applicationId);
  } else {
    throw new APIError(
      "Unauthorized",
      httpStatus.UNAUTHORIZED,
      true,
      "You are not permitted to operate on this resource"
    );
  }

  await updateApplication(data, applicationId);
  res.status(httpStatus.OK).send({ message: "Application updated" });
});

export const withdrawUserApplication = asyncHandler(async (req, res) => {
  const { applicationId, user } = req.params;
  const id = req.id;
  const role = req.role;

  if (user !== id) {
    throw new APIError(
      "Unauthorized",
      httpStatus.UNAUTHORIZED,
      true,
      "You are not permitted to operate on this resource"
    );
  }
  const application = await getApplicationByID(applicationId);

  if (application.freelancer_id === userId || role === "admin") {
    await destroyApplication(applicationId);
  } else {
    throw new APIError(
      "Unauthorized",
      httpStatus.UNAUTHORIZED,
      true,
      "You are not permitted to operate on this resource"
    );
  }

  res.status(httpStatus.OK).send({ message: "Application withdrawn" });
});

export const acceptApplication = asyncHandler(async (req, res) => {
  const { userId, applicationId } = req.params;
  const role = req.role;
  const id = req.user;
  const { status } = req.body;

  if (id !== userId || role === "freelancer") {
    throw new APIError(
      "Unauthorized",
      httpStatus.UNAUTHORIZED,
      true,
      "You are not permitted to operate on this resource"
    );
  }
  const application = await getApplicationByID(applicationId);
  logger.info(application);
  if (application.employer_id === userId || role === "admin") {
    application.status = status;
    await application.save();
  } else {
    throw new APIError(
      "Unauthorized",
      httpStatus.UNAUTHORIZED,
      true,
      "You are not permitted to operate on this resource"
    );
  }
  logger.info("======> This works!");

  res.status(httpStatus.OK).send({ message: "Application accepted" });
});
