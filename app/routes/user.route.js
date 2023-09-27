import express from "express";
import { createUser, fetchUsers } from "../controllers/users.constroller.js";

const router = express.Router();

router.get("", fetchUsers);

router.post("", createUser);

router.put("/:id");

router.delete("/:id");

export { router };
