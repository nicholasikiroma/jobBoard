import express from "express";
import { userController } from "../controllers/users.constroller.js";
import jwtRequired from "../middlewares/verifyJWT.js";
import { validator } from "../validators/user.validator.js";
import validate from "../middlewares/validate.js";

const userRouter = express.Router();

userRouter.get("", userController.fetchUsers);

userRouter.get(
  "/:userId",
  validator.fetchById(),
  validate,
  userController.fetchOneUser
);

userRouter.post("", validator.signUp(), validate, userController.createUser);

userRouter.put(
  "/:userId",
  jwtRequired,
  validator.updateUser(),
  validate,
  userController.updateOneUser
);

userRouter.delete(
  "/:userId",
  jwtRequired,
  validator.fetchById(),
  validate,
  userController.deleteOneUser
);

export default userRouter;
