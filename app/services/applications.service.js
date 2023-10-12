import dB from "../models/index.js";
import { APIError } from "../config/error.js";
import httpStatus from "http-status";

// fetch application by ID
async function getApplicationByID(applicationId) {
  const application = await dB.applications.findByPk(applicationId);
  if (!application) {
    throw new APIError(
      "Not Found",
      httpStatus.NOT_FOUND,
      true,
      "Application not found"
    );
  }
  return application;
}

// Get application by applicationId and FreelancerId
async function applicationExists(jobId, freelancer_id) {
  const application = await dB.applications.findOne({
    where: { job_posting_id: jobId, freelancer_id: freelancer_id },
  });
  return application ? true : false;
}

// create application
async function newApplication(data) {
  const application = await dB.applications.create({ ...data });
  if (!application) {
    throw new APIError(
      "Internal Server Error",
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
      "Failed to create application"
    );
  }
  return application;
}

// create application
async function updateApplication(data, applicationId) {
  const application = await dB.applications.update(
    { ...data },
    {
      where: {
        id: applicationId,
      },
    }
  );
  if (!application) {
    throw new APIError(
      "Internal Server Error",
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
      "Failed to update application"
    );
  }
  return application;
}

// create application
async function destroyApplication(applicationId) {
  const application = await dB.applications.destroy({
    where: {
      id: applicationId,
    },
  });
  if (!application) {
    throw new APIError(
      "Internal Server Error",
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
      "Failed to delete application"
    );
  }
  return application;
}

export default applicationService = {
  updateApplication,
  newApplication,
  destroyApplication,
  getApplicationByID,
  applicationExists,
};
