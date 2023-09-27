import httpStatus from "http-status";
import dB from "../models/index.js";

export async function getUsers() {
  try {
    const users = await dB.users.findAll();
    return users;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}

export async function newUser(data) {
  try {
    const user = await dB.users.create(data);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}
