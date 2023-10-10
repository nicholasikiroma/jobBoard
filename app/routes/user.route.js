import express from "express";
import {
  createUser,
  deleteOneUser,
  fetchOneUser,
  fetchUsers,
  updateOneUser,
} from "../controllers/users.constroller.js";
import jwtRequired from "../middlewares/verifyJWT.js";

const userRouter = express.Router();

userRouter.get("", fetchUsers);

userRouter.get("/:userId", fetchOneUser);

userRouter.post("", createUser);

userRouter.put("/:userId", jwtRequired, updateOneUser);

userRouter.delete("/:userId", jwtRequired, deleteOneUser);

export default userRouter;
