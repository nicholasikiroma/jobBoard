import asyncHandler from "express-async-handler";
import {
  getUserByEmail,
  getUserByID,
  getUsers,
  newUser,
  removeUser,
  updateUser,
} from "../services/user.service.js";
import httpStatus from "http-status";
import { APIError } from "../config/error.js";

/**
 *
 */
export const fetchUsers = asyncHandler(async (req, res) => {
  const allUsers = await getUsers();
  res.send(allUsers);
});

/**
 *
 */
export const fetchOneUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await getUserByID(userId);

  res.status(httpStatus.OK).send(user);
});

/**
 *
 */
export const createUser = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const existingUser = await getUserByEmail(data.email);
  if (existingUser) {
    throw new APIError(
      "CONFLICT",
      httpStatus.CONFLICT,
      true,
      "User account with email already exists"
    );
  }
  const user = await newUser(data);
  res.status(httpStatus.CREATED).send({
    data: user,
  });
});

export const updateOneUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const data = req.body;

  const user = await updateUser(data, userId);
  res.status(httpStatus.OK).send({ message: "Account updated" });
});

export const deleteOneUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await removeUser(userId);
  res.status(httpStatus.OK).send({ message: "Account deleted" });
});
