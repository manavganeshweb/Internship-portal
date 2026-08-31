import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getStudentDashboard,
} from "../controllers/studentController.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  getStudentDashboard
);

export default router;