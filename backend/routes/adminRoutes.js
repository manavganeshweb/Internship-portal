import express from "express";

import {
  createAdmin,
  loginAdmin,
  getAllStudents,
  getStudentById,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

const router = express.Router();

// ====================
// ADMIN AUTH
// ====================

router.post("/create", createAdmin);
router.post("/login", loginAdmin);

// ====================
// STUDENTS
// ====================

router.get(
  "/students",
  authMiddleware,
  adminMiddleware,
  getAllStudents
);

router.get(
  "/students/:id",
  authMiddleware,
  adminMiddleware,
  getStudentById
);

// ====================
// APPLICATIONS
// ====================

router.get(
  "/applications",
  authMiddleware,
  adminMiddleware,
  getAllApplications
);

router.get(
  "/applications/:id",
  authMiddleware,
  adminMiddleware,
  getApplicationById
);

router.patch(
  "/applications/:id/status",
  authMiddleware,
  adminMiddleware,
  updateApplicationStatus
);

export default router;