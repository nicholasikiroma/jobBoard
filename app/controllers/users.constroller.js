import expressAsyncHandler from "express-async-handler";
import { getUsers, newUser } from "../services/user.service.js";
import httpStatus from "http-status";

export const fetchUsers = expressAsyncHandler(async (req, res) => {
  const allUsers = await getUsers();
  if (allUsers) {
    res.status(httpStatus.OK).send({
      message: "success",
      data: [allUsers],
    });
  }
});

export const createUser = expressAsyncHandler(async (req, res) => {
  const data = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    hashed_password: req.body.password,
    skill: req.body.skill,
  };

  const user = await newUser(data);
  res.status(httpStatus.CREATED).send({
    message: "User created",
    data: user,
  });
});
