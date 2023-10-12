import express from "express";
import userController from "../controllers/users.constroller.js";
import jwtRequired from "../middlewares/verifyJWT.js";

const userRouter = express.Router();

userRouter.get("", userController.fetchUsers);

userRouter.get("/:userId", userController.fetchOneUser);

userRouter.post("", userController.createUser);

userRouter.put("/:userId", jwtRequired, userController.updateOneUser);

userRouter.delete("/:userId", jwtRequired, userController.deleteOneUser);

export default userRouter;
