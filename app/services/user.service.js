import httpStatus from "http-status";
import { APIError } from "../config/error.js";
import dB from "../models/index.js";

/**
 *
 * @returns
 */
async function getUsers() {
  const users = await dB.users.findAll({
    attributes: { exclude: ["hashed_password"] },
    include: [
      {
        model: dB.jobPostings, // Include "freelancerJobs"
        as: "freelancerJobs",
      },
      {
        model: dB.jobPostings, // Include "employerJobs"
        as: "employerJobs",
      },
    ],
  });

  if (!users) {
    throw new APIError(
      "INTERNAL SERVER ERROR",
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
      "Unable to fetch users."
    );
  }

  return users;
}

/**
 *
 * @param {Array} data
 * @returns
 */
async function newUser(data) {
  const user = await dB.users.create({ ...data });
  if (!user) {
    throw new APIError(
      "INTERNAL SERVER ERROR",
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
      "Unable to create new user account"
    );
  }
  return user;
}

/**
 *
 * @param {ObjectId} userId
 * @returns
 */
async function getUserByID(userId) {
  const user = await dB.users.findByPk(userId);
  if (!user) {
    throw new APIError(
      "NOT FOUND",
      httpStatus.NOT_FOUND,
      true,
      "User account not found"
    );
  }
  return user;
}

/**
 *
 * @param {string} email
 * @returns
 */
async function getUserByEmail(email) {
  const user = await dB.users.findOne({ where: { email: email } });
  return user;
}

/**
 *
 * @param {*} data
 * @param {*} userId
 * @returns
 */
async function updateUser(data, userId) {
  const user = await dB.users.update(
    { ...data },
    {
      where: {
        id: userId,
      },
    }
  );
  if (!user) {
    throw new APIError(
      "NOT FOUND",
      httpStatus.NOT_FOUND,
      true,
      "Unable to update user account"
    );
  }
  return user;
}

/**
 *
 * @param {*} userId
 * @returns
 */
async function removeUser(userId) {
  const user = await dB.users.destroy({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new APIError(
      "NOT FOUND",
      httpStatus.NOT_FOUND,
      true,
      "Unable to delete user account"
    );
  }
  return user;
}

export default userService = {
  getUserByEmail,
  getUserByID,
  getUsers,
  removeUser,
  updateUser,
  newUser,
};
