import { Router } from "express";
import {
  create,
  deletePost,
  editPost,
  getPost,
} from "../controllers/post/index.js";

const router = Router();

// AUTH

router.get("/", getPost);
router.post("/", create);
router.put("/", editPost);
router.delete("/", deletePost);

export default router;
