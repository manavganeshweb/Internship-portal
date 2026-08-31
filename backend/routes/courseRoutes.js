import express from "express";

import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ====================
// PUBLIC / STUDENT
// ====================

router.get("/", getCourses);

router.get("/all", getCourses);

router.get("/:id", getCourseById);


router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createCourse
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateCourse
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteCourse
);

export default router;