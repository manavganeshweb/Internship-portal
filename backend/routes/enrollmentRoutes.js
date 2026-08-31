import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  enrollInCourse,
  getMyEnrollments,
  getEnrollmentByCourse,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/", authMiddleware, enrollInCourse);

router.get("/my", authMiddleware, getMyEnrollments);

router.get(
  "/course/:courseId",
  authMiddleware,
  getEnrollmentByCourse
);

export default router;