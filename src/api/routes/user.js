import { Router } from "express";
import {
  register,
  getUser,
  editUser,
  deleteUser,
} from "../controllers/user/index.js";

const router = Router();

// AUTH

router.get("/", getUser);
router.post("/", register);
router.put("/", editUser);
router.delete("/", deleteUser);

export default router;
