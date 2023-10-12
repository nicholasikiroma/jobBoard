import asyncHandler from "express-async-handler";
import { userService } from "../services/user.service.js";
import httpStatus from "http-status";
import { APIError } from "../config/error.js";

/**
 *
 */
const fetchUsers = asyncHandler(async (req, res) => {
  const allUsers = await userService.getUsers();
  res.send(allUsers);
});

/**
 *
 */
const fetchOneUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserByID(userId);

  res.status(httpStatus.OK).send(user);
});

/**
 *
 */
const createUser = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const existingUser = await userService.getUserByEmail(data.email);
  if (existingUser) {
    throw new APIError(
      "CONFLICT",
      httpStatus.CONFLICT,
      true,
      "User account with email already exists"
    );
  }
  const user = await userService.newUser(data);
  res.status(httpStatus.CREATED).send({
    data: user,
  });
});

const updateOneUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const data = req.body;

  const user = await userService.updateUser(data, userId);
  res.status(httpStatus.OK).send({ message: "Account updated" });
});

const deleteOneUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await userService.removeUser(userId);
  res.status(httpStatus.OK).send({ message: "Account deleted" });
});

export const userController = {
  deleteOneUser,
  updateOneUser,
  createUser,
  fetchOneUser,
  fetchUsers,
};
