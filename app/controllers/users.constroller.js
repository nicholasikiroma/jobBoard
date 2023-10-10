import expressAsyncHandler from "express-async-handler";
import {
  getUserByEmail,
  getUserByID,
  getUsers,
  newUser,
  removeUser,
  updateUser,
} from "../services/user.service.js";
import httpStatus from "http-status";

/**
 *
 */
export const fetchUsers = expressAsyncHandler(async (req, res) => {
  const allUsers = await getUsers();
  if (allUsers) {
    res.status(httpStatus.OK).send({
      data: allUsers,
    });
  }
});

/**
 *
 */
export const fetchOneUser = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await getUserByID(userId);
  if (!user) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Account not found" });
  }
  res.status(httpStatus.OK).send(user);
});

/**
 *
 */
export const createUser = expressAsyncHandler(async (req, res) => {
  const data = req.body;

  const existingUser = await getUserByEmail(data.email);
  if (existingUser) {
    return res
      .status(httpStatus.CONFLICT)
      .send({ message: "user with email already exists" });
  }
  const user = await newUser(data);
  res.status(httpStatus.CREATED).send({
    data: user,
  });
});

export const updateOneUser = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const data = req.body;

  const user = await updateUser(data, userId);
  if (!user) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Account not found" });
  }
  res.status(httpStatus.OK).send({ message: "Account updated" });
});

export const deleteOneUser = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await removeUser(userId);
  if (!user) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Account not found" });
  }
  res.status(httpStatus.OK).send({ message: "Account deleted" });
});
